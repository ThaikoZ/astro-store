import { formatPrice } from '../lib/formatPrice';
import { clearLocalCartSessionCookie } from '../lib/shop/hostedCheckout';
import { getBrowserWooClient } from '../lib/woocommerce';
import type { CustomerFragment, OrderFragmentFragment } from '../lib/woocommerce/generated/sdk';
import { resetCartUiAfterCheckout } from './cart-ui';

const VALID_TABS = new Set(['kokpit', 'profil', 'kursy', 'zamowienia', 'ustawienia']);

type AccountTab = string;

function setStatus(
	el: Element | null,
	message: string,
	kind: 'error' | 'success' | 'info' = 'error',
) {
	if (!(el instanceof HTMLElement)) return;
	el.hidden = !message;
	el.classList.toggle('hidden', !message);
	el.textContent = message;
	el.classList.toggle('text-red-800', kind === 'error');
	el.classList.toggle('text-ink/70', kind === 'info' || kind === 'success');
}

function ensureBtnSpinner(button: HTMLButtonElement) {
	if (button.querySelector('[data-btn-spinner]')) return;
	const spinner = document.createElement('span');
	spinner.className = 'btn-spinner';
	spinner.setAttribute('data-btn-spinner', '');
	spinner.setAttribute('aria-hidden', 'true');
	button.prepend(spinner);
	button.classList.add('inline-flex', 'items-center', 'justify-center', 'gap-2.5');
}

function setLoading(button: HTMLButtonElement | null, loading: boolean) {
	if (!button) return;
	ensureBtnSpinner(button);
	button.disabled = loading;
	button.setAttribute('aria-busy', loading ? 'true' : 'false');
	button.classList.toggle('opacity-60', loading);
	button.classList.toggle('cursor-not-allowed', loading);
}

function polishError(message: string): string {
	const cleaned = message
		.replace(/<[^>]*>/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/\s+/g, ' ')
		.trim();
	const lower = cleaned.toLowerCase();
	if (
		lower.includes('failed to fetch') ||
		lower.includes('networkerror') ||
		lower.includes('invalid url')
	) {
		return 'Nie udało się połączyć z serwerem. Spróbuj ponownie.';
	}
	return cleaned || 'Coś poszło nie tak. Spróbuj ponownie.';
}

function initialsFrom(first?: string | null, last?: string | null, fallback?: string | null) {
	const a = (first ?? '').trim();
	const b = (last ?? '').trim();
	if (a || b) {
		return `${a.charAt(0)}${b.charAt(0) || a.charAt(1) || ''}`.toUpperCase();
	}
	const f = (fallback ?? '').trim();
	return f.slice(0, 2).toUpperCase();
}

function displayName(first?: string | null, last?: string | null, username?: string | null) {
	const full = [first, last].filter(Boolean).join(' ').trim();
	return full || username || 'Użytkowniku';
}

function formatOrderDate(value?: string | null) {
	if (!value) return '—';
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	return new Intl.DateTimeFormat('pl-PL', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}).format(date);
}

function formatOrderStatus(status?: string | null) {
	const map: Record<string, string> = {
		PENDING: 'Oczekujące',
		PROCESSING: 'W trakcie',
		ON_HOLD: 'Wstrzymane',
		COMPLETED: 'Zrealizowane',
		CANCELLED: 'Anulowane',
		REFUNDED: 'Zwrócone',
		FAILED: 'Nieudane',
	};
	if (!status) return '—';
	return map[status] ?? status.replace(/_/g, ' ').toLowerCase();
}

function currentTab(): AccountTab {
	const params = new URLSearchParams(window.location.search);
	const tab = params.get('tab') ?? 'kokpit';
	return VALID_TABS.has(tab) ? tab : 'kokpit';
}

function setTab(tab: AccountTab, push = true) {
	const next = VALID_TABS.has(tab) ? tab : 'kokpit';
	const root = document.querySelector('[data-account-root]');
	if (!(root instanceof HTMLElement)) return;

	for (const panel of root.querySelectorAll<HTMLElement>('[data-account-panel]')) {
		const active = panel.dataset.accountPanel === next;
		panel.classList.toggle('hidden', !active);
		panel.setAttribute('aria-hidden', active ? 'false' : 'true');
	}

	for (const link of root.querySelectorAll<HTMLAnchorElement>('[data-account-tab]')) {
		const active = link.dataset.accountTab === next;
		if (active) link.setAttribute('aria-current', 'page');
		else link.removeAttribute('aria-current');
	}

	if (push) {
		const url = new URL(window.location.href);
		if (next === 'kokpit') url.searchParams.delete('tab');
		else url.searchParams.set('tab', next);
		window.history.pushState({ tab: next }, '', url);
	}

	if (next === 'zamowienia') {
		void loadOrders();
	}
}

function fillProfile(customer: CustomerFragment | null | undefined) {
	const map: Record<string, string> = {
		firstName: customer?.firstName ?? '',
		lastName: customer?.lastName ?? '',
		email: customer?.email ?? customer?.billing?.email ?? '',
		phone: customer?.billing?.phone ?? '',
		address1: customer?.billing?.address1 ?? '',
		city: customer?.billing?.city ?? '',
		postcode: customer?.billing?.postcode ?? '',
	};
	for (const [name, value] of Object.entries(map)) {
		const input = document.querySelector<HTMLInputElement>(
			`[data-account-profile-field="${name}"]`,
		);
		if (input) input.value = value;
	}
}

function setAccountLoading(loading: boolean) {
	const root = document.querySelector('[data-account-root]');
	if (!(root instanceof HTMLElement)) return;
	if (loading) root.setAttribute('data-loading', '');
	else root.removeAttribute('data-loading');
}

function fillIdentity(opts: {
	firstName?: string | null;
	lastName?: string | null;
	username?: string | null;
}) {
	const avatar = document.querySelector('[data-account-avatar]');
	const nameEl = document.querySelector('[data-account-name]');
	if (avatar) {
		avatar.textContent = initialsFrom(opts.firstName, opts.lastName, opts.username);
	}
	if (nameEl) {
		nameEl.textContent = displayName(opts.firstName, opts.lastName, opts.username);
	}
}

const ORDERS_PAGE_SIZE = 5;

let ordersLoaded = false;
let allOrders: OrderFragmentFragment[] = [];
let ordersFilter: 'all' | 'today' | 'month' | 'year' | 'range' = 'all';
let ordersRangeFrom = '';
let ordersRangeTo = '';
let ordersPage = 1;
let viewerId: string | number | null = null;

function startOfDay(date: Date) {
	const next = new Date(date);
	next.setHours(0, 0, 0, 0);
	return next;
}

function endOfDay(date: Date) {
	const next = new Date(date);
	next.setHours(23, 59, 59, 999);
	return next;
}

function getFilterRange(): { from: Date | null; to: Date | null } {
	const now = new Date();
	if (ordersFilter === 'today') {
		return { from: startOfDay(now), to: endOfDay(now) };
	}
	if (ordersFilter === 'month') {
		const from = startOfDay(now);
		from.setMonth(from.getMonth() - 1);
		return { from, to: endOfDay(now) };
	}
	if (ordersFilter === 'year') {
		return {
			from: new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0),
			to: endOfDay(now),
		};
	}
	if (ordersFilter === 'range') {
		const from = ordersRangeFrom ? startOfDay(new Date(ordersRangeFrom)) : null;
		const to = ordersRangeTo ? endOfDay(new Date(ordersRangeTo)) : null;
		return { from, to };
	}
	return { from: null, to: null };
}

function filterOrders(orders: OrderFragmentFragment[]) {
	const { from, to } = getFilterRange();
	if (!from && !to) return orders;
	return orders.filter((order) => {
		if (!order.date) return false;
		const date = new Date(order.date);
		if (Number.isNaN(date.getTime())) return false;
		if (from && date < from) return false;
		if (to && date > to) return false;
		return true;
	});
}

function renderOrdersPagination(totalFiltered: number) {
	const nav = document.querySelector('[data-account-orders-pagination]');
	if (!(nav instanceof HTMLElement)) return;

	const totalPages = Math.max(1, Math.ceil(totalFiltered / ORDERS_PAGE_SIZE));
	if (ordersPage > totalPages) ordersPage = totalPages;

	const show = totalFiltered > ORDERS_PAGE_SIZE;
	nav.hidden = !show;
	nav.classList.toggle('hidden', !show);
	nav.classList.toggle('flex', show);
	nav.replaceChildren();
	if (!show) return;

	const meta = document.createElement('p');
	meta.className = 'm-0 font-sans text-xs tracking-wide text-ink/55';
	const from = (ordersPage - 1) * ORDERS_PAGE_SIZE + 1;
	const to = Math.min(ordersPage * ORDERS_PAGE_SIZE, totalFiltered);
	meta.textContent = `${from}–${to} z ${totalFiltered}`;

	const controls = document.createElement('div');
	controls.className = 'flex items-center gap-2';

	const prev = document.createElement('button');
	prev.type = 'button';
	prev.className =
		'cursor-pointer border border-border-soft bg-foam px-3 py-2 font-sans text-xs tracking-[0.12em] text-ink uppercase transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40';
	prev.textContent = 'Poprzednia';
	prev.disabled = ordersPage <= 1;
	prev.addEventListener('click', () => {
		if (ordersPage <= 1) return;
		ordersPage -= 1;
		renderOrders();
	});

	const pageLabel = document.createElement('span');
	pageLabel.className = 'min-w-[4.5rem] text-center font-sans text-xs text-ink/70 tabular-nums';
	pageLabel.textContent = `${ordersPage} / ${totalPages}`;

	const next = document.createElement('button');
	next.type = 'button';
	next.className =
		'cursor-pointer border border-border-soft bg-foam px-3 py-2 font-sans text-xs tracking-[0.12em] text-ink uppercase transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40';
	next.textContent = 'Następna';
	next.disabled = ordersPage >= totalPages;
	next.addEventListener('click', () => {
		if (ordersPage >= totalPages) return;
		ordersPage += 1;
		renderOrders();
	});

	controls.append(prev, pageLabel, next);
	nav.append(meta, controls);
}

function renderOrders() {
	const loaded = document.querySelector('[data-account-orders-loaded]');
	if (!(loaded instanceof HTMLElement)) return;

	loaded.replaceChildren();
	const filtered = filterOrders(allOrders);

	if (allOrders.length === 0) {
		const p = document.createElement('p');
		p.className = 'm-0 font-sans text-sm text-ink/55';
		p.textContent = 'Nie masz jeszcze żadnych zamówień.';
		loaded.append(p);
		renderOrdersPagination(0);
		return;
	}

	if (filtered.length === 0) {
		const p = document.createElement('p');
		p.className = 'm-0 font-sans text-sm text-ink/55';
		p.textContent = 'Brak zamówień w wybranym okresie.';
		loaded.append(p);
		renderOrdersPagination(0);
		return;
	}

	const totalPages = Math.max(1, Math.ceil(filtered.length / ORDERS_PAGE_SIZE));
	if (ordersPage > totalPages) ordersPage = totalPages;
	if (ordersPage < 1) ordersPage = 1;

	const start = (ordersPage - 1) * ORDERS_PAGE_SIZE;
	const pageOrders = filtered.slice(start, start + ORDERS_PAGE_SIZE);

	for (const order of pageOrders) {
		const id = order.orderNumber ?? order.databaseId;
		if (id == null) continue;

		const link = document.createElement('a');
		link.href = `/moje-konto/zamowienie/?id=${encodeURIComponent(String(id))}`;
		link.className =
			'block border border-border-soft bg-foam px-4 py-4 no-underline transition-colors hover:border-ink/40 md:px-5';
		link.innerHTML = `
			<div class="flex flex-wrap items-baseline justify-between gap-2">
				<p class="m-0 font-sans text-sm font-medium text-ink">Zamówienie #${order.orderNumber ?? order.databaseId ?? '-'}</p>
				<p class="m-0 font-sans text-sm text-ink">${formatPrice(order.total)}</p>
			</div>
			<div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-sans text-xs text-ink/55">
				<span>${formatOrderDate(order.date)}</span>
				<span>${formatOrderStatus(order.status)}</span>
				${order.paymentMethodTitle ? `<span>${order.paymentMethodTitle}</span>` : ''}
			</div>
		`;
		loaded.append(link);
	}

	renderOrdersPagination(filtered.length);
}

function setOrdersFilter(next: typeof ordersFilter) {
	ordersFilter = next;
	ordersPage = 1;
	const root = document.querySelector('[data-account-orders-filters]');
	if (!(root instanceof HTMLElement)) return;

	for (const btn of root.querySelectorAll<HTMLButtonElement>('[data-orders-filter]')) {
		btn.setAttribute('aria-pressed', btn.dataset.ordersFilter === next ? 'true' : 'false');
	}

	const range = root.querySelector('[data-orders-range]');
	if (range instanceof HTMLElement) {
		const show = next === 'range';
		range.hidden = !show;
		range.classList.toggle('hidden', !show);
		range.classList.toggle('flex', show);
	}

	if (next !== 'range') renderOrders();
}

function initOrdersFilters(root: HTMLElement) {
	const filters = root.querySelector('[data-account-orders-filters]');
	if (!(filters instanceof HTMLElement) || filters.dataset.bound === 'true') return;
	filters.dataset.bound = 'true';

	for (const btn of filters.querySelectorAll<HTMLButtonElement>('[data-orders-filter]')) {
		btn.addEventListener('click', () => {
			const id = btn.dataset.ordersFilter;
			if (id === 'all' || id === 'today' || id === 'month' || id === 'year' || id === 'range') {
				setOrdersFilter(id);
			}
		});
	}

	const apply = filters.querySelector('[data-orders-range-apply]');
	const fromInput = filters.querySelector<HTMLInputElement>('[data-orders-from]');
	const toInput = filters.querySelector<HTMLInputElement>('[data-orders-to]');

	apply?.addEventListener('click', () => {
		ordersRangeFrom = fromInput?.value ?? '';
		ordersRangeTo = toInput?.value ?? '';
		if (ordersRangeFrom && ordersRangeTo && ordersRangeFrom > ordersRangeTo) {
			setStatus(
				document.querySelector('[data-account-status="orders"]'),
				'Data początkowa nie może być późniejsza niż końcowa.',
			);
			return;
		}
		setStatus(document.querySelector('[data-account-status="orders"]'), '');
		ordersFilter = 'range';
		ordersPage = 1;
		setOrdersFilter('range');
		renderOrders();
	});
}

async function loadOrders() {
	if (ordersLoaded) {
		renderOrders();
		return;
	}
	const list = document.querySelector('[data-account-orders]');
	const loaded = document.querySelector('[data-account-orders-loaded]');
	const status = document.querySelector('[data-account-status="orders"]');
	if (!(list instanceof HTMLElement) || !(loaded instanceof HTMLElement)) return;

	list.setAttribute('data-loading', '');

	try {
		const woo = getBrowserWooClient();
		const result = await woo.orders.getOrders();
		allOrders = (result.customer?.orders?.nodes ?? []).filter(
			(order): order is OrderFragmentFragment => Boolean(order),
		);
		ordersLoaded = true;
		renderOrders();
	} catch (error) {
		setStatus(status, polishError(error instanceof Error ? error.message : ''));
		loaded.replaceChildren();
		const p = document.createElement('p');
		p.className = 'm-0 font-sans text-sm text-ink/55';
		p.textContent = 'Nie udało się pobrać zamówień.';
		loaded.append(p);
	} finally {
		list.removeAttribute('data-loading');
	}
}

function initPasswordToggles(root: HTMLElement) {
	const toggles = root.querySelectorAll<HTMLButtonElement>('[data-auth-password-toggle]');
	for (const toggle of toggles) {
		if (toggle.dataset.bound === 'true') continue;
		toggle.dataset.bound = 'true';
		toggle.addEventListener('click', () => {
			const wrap = toggle.closest('div');
			const input = wrap?.querySelector<HTMLInputElement>('[data-auth-password-input]');
			if (!input) return;
			const show = input.type === 'password';
			input.type = show ? 'text' : 'password';
			toggle.setAttribute('aria-pressed', show ? 'true' : 'false');
			toggle.setAttribute('aria-label', show ? 'Ukryj hasło' : 'Pokaż hasło');
			toggle.querySelector('[data-auth-password-icon="show"]')?.classList.toggle('hidden', show);
			toggle.querySelector('[data-auth-password-icon="hide"]')?.classList.toggle('hidden', !show);
		});
	}
}

function initNav(root: HTMLElement) {
	for (const link of root.querySelectorAll<HTMLAnchorElement>('[data-account-tab]')) {
		link.addEventListener('click', (event) => {
			event.preventDefault();
			const tab = link.dataset.accountTab;
			if (tab) setTab(tab);
		});
	}

	window.addEventListener('popstate', () => {
		setTab(currentTab(), false);
	});
}

function initProfileForm(root: HTMLElement) {
	const form = root.querySelector<HTMLFormElement>('[data-account-form="profile"]');
	if (!form || form.dataset.bound === 'true') return;
	form.dataset.bound = 'true';

	const status = form.querySelector('[data-account-status="profile"]');
	const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		setStatus(status, '');
		setLoading(submit, true);

		const data = new FormData(form);
		const firstName = String(data.get('firstName') ?? '').trim();
		const lastName = String(data.get('lastName') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const phone = String(data.get('phone') ?? '').trim();
		const address1 = String(data.get('address1') ?? '').trim();
		const city = String(data.get('city') ?? '').trim();
		const postcode = String(data.get('postcode') ?? '').trim();

		try {
			const woo = getBrowserWooClient();
			const result = await woo.checkout.updateCustomer({
				firstName,
				lastName,
				email,
				billing: {
					firstName,
					lastName,
					email,
					phone,
					address1,
					city,
					postcode,
				},
			});
			const customer = result.updateCustomer?.customer;
			fillProfile(customer ?? undefined);
			fillIdentity({
				firstName: customer?.firstName ?? firstName,
				lastName: customer?.lastName ?? lastName,
				username: customer?.username,
			});
			setStatus(status, 'Zapisano zmiany.', 'success');
		} catch (error) {
			setStatus(status, polishError(error instanceof Error ? error.message : ''));
		} finally {
			setLoading(submit, false);
		}
	});
}

function initPasswordForm(root: HTMLElement) {
	const form = root.querySelector<HTMLFormElement>('[data-account-form="password"]');
	if (!form || form.dataset.bound === 'true') return;
	form.dataset.bound = 'true';

	const status = form.querySelector('[data-account-status="password"]');
	const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		setStatus(status, '');

		const data = new FormData(form);
		const password = String(data.get('password') ?? '');
		const passwordConfirm = String(data.get('passwordConfirm') ?? '');

		if (!password) {
			setStatus(status, 'Podaj nowe hasło.');
			return;
		}
		if (password !== passwordConfirm) {
			setStatus(status, 'Hasła nie są takie same.');
			return;
		}
		if (!viewerId) {
			setStatus(status, 'Nie udało się ustalić konta. Odśwież stronę i spróbuj ponownie.');
			return;
		}

		setLoading(submit, true);
		try {
			const woo = getBrowserWooClient();
			await woo.auth.updatePassword({ id: viewerId, password });
			form.reset();
			setStatus(status, 'Hasło zostało zmienione.', 'success');
		} catch (error) {
			setStatus(status, polishError(error instanceof Error ? error.message : ''));
		} finally {
			setLoading(submit, false);
		}
	});
}

function initLogout(root: HTMLElement) {
	const btn = root.querySelector<HTMLButtonElement>('[data-account-logout]');
	if (!btn || btn.dataset.bound === 'true') return;
	btn.dataset.bound = 'true';

	btn.addEventListener('click', async () => {
		setLoading(btn, true);
		try {
			const woo = getBrowserWooClient();
			await woo.auth.logout();
			window.location.href = '/logowanie/';
		} catch (error) {
			setLoading(btn, false);
			window.alert(polishError(error instanceof Error ? error.message : ''));
		}
	});
}

async function loadAccount(root: HTMLElement) {
	const woo = getBrowserWooClient();
	if (!woo.auth.isAuthenticated()) {
		window.location.href = '/logowanie/';
		return;
	}

	setAccountLoading(true);
	try {
		const cart = await woo.cart.getCart();
		const viewer = cart.viewer;
		const customer = cart.customer;
		viewerId = viewer?.id ?? viewer?.databaseId ?? null;

		fillIdentity({
			firstName: customer?.firstName ?? viewer?.firstName,
			lastName: customer?.lastName ?? viewer?.lastName,
			username: customer?.username ?? viewer?.username,
		});
		fillProfile(customer);
	} catch (error) {
		fillIdentity({});
		console.error(error);
	} finally {
		setAccountLoading(false);
	}
}

function clearCartAfterHostedCheckoutReturn() {
	const params = new URLSearchParams(window.location.search);
	if (params.get('from_checkout') !== '1') return;

	clearLocalCartSessionCookie();
	resetCartUiAfterCheckout();

	params.delete('from_checkout');
	const next = `${window.location.pathname}?${params.toString()}`.replace(/\?$/, '');
	window.history.replaceState({}, '', next);
}

export async function initAccountUi() {
	const root = document.querySelector('[data-account-root]');
	if (!(root instanceof HTMLElement) || root.dataset.bound === 'true') return;
	root.dataset.bound = 'true';

	clearCartAfterHostedCheckoutReturn();

	try {
		const woo = getBrowserWooClient();
		if (!woo.auth.isAuthenticated()) {
			window.location.href = '/logowanie/';
			return;
		}
	} catch {
		window.location.href = '/logowanie/';
		return;
	}

	initNav(root);
	initPasswordToggles(root);
	initProfileForm(root);
	initPasswordForm(root);
	initLogout(root);
	initOrdersFilters(root);
	setTab(currentTab(), false);
	await loadAccount(root);
}

initAccountUi();
document.addEventListener('astro:page-load', initAccountUi);
