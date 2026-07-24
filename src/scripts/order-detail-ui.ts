import { formatPrice, isZeroPrice } from '../lib/formatPrice';
import { getBrowserWooClient } from '../lib/woocommerce';
import type { OrderFragmentFragment } from '../lib/woocommerce/generated/sdk';

function formatOrderDate(value?: string | null) {
	if (!value) return '-';
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	return new Intl.DateTimeFormat('pl-PL', {
		day: 'numeric',
		month: 'long',
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
	if (!status) return '-';
	return map[status] ?? status.replace(/_/g, ' ').toLowerCase();
}

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function formatAddress(
	address: OrderFragmentFragment['billing'] | OrderFragmentFragment['shipping'],
) {
	if (!address) return '<p class="m-0 text-ink/55">Brak danych</p>';
	const lines = [
		[address.firstName, address.lastName].filter(Boolean).join(' '),
		address.company,
		address.address1,
		address.address2,
		[address.postcode, address.city].filter(Boolean).join(' '),
		address.country,
		address.phone,
		address.email,
	].filter(Boolean) as string[];

	if (lines.length === 0) return '<p class="m-0 text-ink/55">Brak danych</p>';
	return lines.map((line) => `<p class="m-0">${escapeHtml(line)}</p>`).join('');
}

function lineItemName(item: NonNullable<NonNullable<OrderFragmentFragment['lineItems']>['nodes'][number]>) {
	const variation = item?.variation?.node?.name;
	const product = item?.product?.node?.name;
	return variation || product || 'Produkt';
}

function renderOrder(order: OrderFragmentFragment) {
	const items = (order.lineItems?.nodes ?? []).filter(Boolean);
	const itemsHtml =
		items.length === 0
			? '<p class="m-0 font-sans text-sm text-ink/55">Brak pozycji w zamówieniu.</p>'
			: items
					.map((item) => {
						const name = lineItemName(item!);
						const qty = item?.quantity ?? 0;
						const total = formatPrice(item?.total);
						return `
							<div class="flex flex-wrap items-baseline justify-between gap-3 border-b border-border-soft py-4 last:border-0">
								<div>
									<p class="m-0 font-sans text-sm font-medium text-ink">${escapeHtml(name)}</p>
									<p class="mt-1 m-0 font-sans text-xs text-ink/55">Ilość: ${qty}</p>
								</div>
								<p class="m-0 font-sans text-sm text-ink">${escapeHtml(total)}</p>
							</div>
						`;
					})
					.join('');

	const downloads = (order.downloadableItems?.nodes ?? []).filter(Boolean);
	const downloadsHtml =
		downloads.length === 0
			? ''
			: `
				<section class="mt-8 border border-border-soft bg-foam p-5 md:p-6">
					<h2 class="mt-0 mb-4 font-sans text-xs font-medium tracking-[0.16em] text-ink/50 uppercase">
						Pliki do pobrania
					</h2>
					<ul class="m-0 list-none space-y-2 p-0">
						${downloads
							.map((file) => {
								const label = file?.name || 'Plik';
								const url = file?.url;
								if (!url) {
									return `<li class="font-sans text-sm text-ink/55">${escapeHtml(label)}</li>`;
								}
								return `<li><a href="${escapeHtml(url)}" class="font-sans text-sm text-ink underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a></li>`;
							})
							.join('')}
					</ul>
				</section>
			`;

	return `
		<header>
			<h1 class="m-0 font-display text-[clamp(1.6rem,3vw,2.15rem)] font-normal tracking-[0.02em] text-ink">
				Zamówienie #${escapeHtml(String(order.orderNumber ?? order.databaseId ?? '-'))}
			</h1>
			<div class="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-sans text-sm text-ink/55">
				<span>${escapeHtml(formatOrderDate(order.date))}</span>
				<span>${escapeHtml(formatOrderStatus(order.status))}</span>
				${order.paymentMethodTitle ? `<span>${escapeHtml(order.paymentMethodTitle)}</span>` : ''}
			</div>
		</header>

		<section class="mt-8 border border-border-soft bg-foam p-5 md:p-6">
			<h2 class="mt-0 mb-2 font-sans text-xs font-medium tracking-[0.16em] text-ink/50 uppercase">
				Produkty
			</h2>
			${itemsHtml}
		</section>

		<section class="mt-6 border border-border-soft bg-foam p-5 md:p-6">
			<h2 class="mt-0 mb-4 font-sans text-xs font-medium tracking-[0.16em] text-ink/50 uppercase">
				Podsumowanie
			</h2>
			<dl class="m-0 space-y-2 font-sans text-sm">
				<div class="flex justify-between gap-4"><dt class="text-ink/55">Suma częściowa</dt><dd class="m-0 text-ink">${escapeHtml(formatPrice(order.subtotal))}</dd></div>
				<div class="flex justify-between gap-4"><dt class="text-ink/55">Dostawa</dt><dd class="m-0 text-ink">${escapeHtml(formatPrice(order.shippingTotal))}</dd></div>
				<div class="flex justify-between gap-4"><dt class="text-ink/55">Podatek</dt><dd class="m-0 text-ink">${escapeHtml(formatPrice(order.totalTax))}</dd></div>
				${order.discountTotal && !isZeroPrice(order.discountTotal) ? `<div class="flex justify-between gap-4"><dt class="text-ink/55">Rabat</dt><dd class="m-0 text-ink">${escapeHtml(formatPrice(order.discountTotal))}</dd></div>` : ''}
				<div class="flex justify-between gap-4 border-t border-border-soft pt-3"><dt class="font-medium text-ink">Razem</dt><dd class="m-0 font-medium text-ink">${escapeHtml(formatPrice(order.total))}</dd></div>
			</dl>
		</section>

		<div class="mt-6 grid gap-6 md:grid-cols-2">
			<section class="border border-border-soft bg-foam p-5 md:p-6">
				<h2 class="mt-0 mb-4 font-sans text-xs font-medium tracking-[0.16em] text-ink/50 uppercase">
					Adres rozliczeniowy
				</h2>
				<div class="space-y-1 font-sans text-sm leading-relaxed text-ink">
					${formatAddress(order.billing)}
				</div>
			</section>
			<section class="border border-border-soft bg-foam p-5 md:p-6">
				<h2 class="mt-0 mb-4 font-sans text-xs font-medium tracking-[0.16em] text-ink/50 uppercase">
					Adres dostawy
				</h2>
				<div class="space-y-1 font-sans text-sm leading-relaxed text-ink">
					${formatAddress(order.shipping)}
				</div>
			</section>
		</div>

		${downloadsHtml}
	`;
}

async function initOrderDetail() {
	const root = document.querySelector('[data-order-detail]');
	if (!(root instanceof HTMLElement) || root.dataset.bound === 'true') return;
	root.dataset.bound = 'true';

	const pathMatch = window.location.pathname.match(/\/moje-konto\/zamowienie\/([^/]+)\/?$/);
	const pathId = pathMatch?.[1] && pathMatch[1] !== 'index.html' ? pathMatch[1] : '';
	const queryId = new URLSearchParams(window.location.search).get('id')?.trim() ?? '';
	const orderId = (queryId || decodeURIComponent(pathId)).trim();
	const content = root.querySelector('[data-order-content]');
	const errorEl = root.querySelector('[data-order-error]');

	// Normalize old path URLs (/moje-konto/zamowienie/15/) to query form.
	if (pathId && !queryId) {
		const url = new URL(window.location.href);
		url.pathname = '/moje-konto/zamowienie/';
		url.searchParams.set('id', decodeURIComponent(pathId));
		window.history.replaceState({}, '', url);
	}

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

	if (!orderId || !(content instanceof HTMLElement)) {
		if (errorEl instanceof HTMLElement) {
			errorEl.hidden = false;
			errorEl.classList.remove('hidden');
			errorEl.textContent = 'Nie znaleziono zamówienia.';
		}
		root.removeAttribute('data-loading');
		return;
	}

	root.setAttribute('data-loading', '');

	try {
		const woo = getBrowserWooClient();
		const result = await woo.orders.getOrder({ id: orderId });
		const nodes = (result.customer?.orders?.nodes ?? []).filter(
			(order): order is OrderFragmentFragment => Boolean(order),
		);
		const order =
			nodes.find(
				(item) =>
					String(item.orderNumber) === orderId || String(item.databaseId) === orderId,
			) ?? nodes[0];

		if (!order) {
			throw new Error('Nie znaleziono zamówienia.');
		}

		content.innerHTML = renderOrder(order);
		document.title = `Zamówienie #${order.orderNumber ?? order.databaseId ?? orderId} - Klaudia Jaranowska Makeup`;
	} catch (error) {
		if (errorEl instanceof HTMLElement) {
			errorEl.hidden = false;
			errorEl.classList.remove('hidden');
			errorEl.textContent =
				error instanceof Error && error.message
					? error.message
					: 'Nie udało się pobrać szczegółów zamówienia.';
		}
	} finally {
		root.removeAttribute('data-loading');
	}
}

initOrderDetail();
document.addEventListener('astro:page-load', initOrderDetail);
