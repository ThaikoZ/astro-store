import { formatPrice } from '../lib/formatPrice';
import {
	fetchHostedCheckoutSettings,
	getHostedCheckoutRedirectUrl,
} from '../lib/shop/hostedCheckout';
import { getBrowserWooClient } from '../lib/woocommerce';
import type { CartFragment } from '../lib/woocommerce/generated/sdk';

type CartLine = NonNullable<NonNullable<CartFragment['contents']>['nodes']>[number];

let documentBound = false;
let refreshPromise: Promise<void> | null = null;

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

function setCartError(message: string) {
	const el = document.querySelector('[data-cart-error]');
	if (!(el instanceof HTMLElement)) return;
	el.textContent = message;
	el.classList.toggle('hidden', !message);
}

function setDrawerOpen(open: boolean) {
	const drawer = document.querySelector('[data-cart-drawer]');
	const backdrop = document.querySelector('[data-cart-backdrop]');
	if (!(drawer instanceof HTMLElement) || !(backdrop instanceof HTMLElement)) return;

	drawer.classList.toggle('is-open', open);
	backdrop.classList.toggle('is-open', open);
	drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
	backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
	document.documentElement.classList.toggle('overflow-hidden', open);

	if (open) {
		const close = drawer.querySelector<HTMLButtonElement>('[data-cart-close]');
		close?.focus({ preventScroll: true });
	}
}

function isDrawerOpen() {
	const drawer = document.querySelector('[data-cart-drawer]');
	return drawer instanceof HTMLElement && drawer.classList.contains('is-open');
}

function setMutating(mutating: boolean) {
	const loading = document.querySelector('[data-cart-loading]');
	if (!(loading instanceof HTMLElement)) return;
	loading.classList.toggle('is-visible', mutating);
	loading.setAttribute('aria-hidden', mutating ? 'false' : 'true');
}

function updateBadge(itemCount: number) {
	document.querySelectorAll('[data-cart-count]').forEach((el) => {
		if (!(el instanceof HTMLElement)) return;
		const count = Math.max(0, itemCount);
		el.textContent = String(count);
		el.hidden = count === 0;
		el.classList.toggle('hidden', count === 0);
	});

	const titleCount = document.querySelector('[data-cart-title-count]');
	if (titleCount instanceof HTMLElement) {
		titleCount.textContent = itemCount > 0 ? ` (${itemCount})` : '';
	}
}

/** Reset header badge / drawer after hosted WP checkout returns. */
export function resetCartUiAfterCheckout() {
	updateBadge(0);
	renderCart(null);
	setCartError('');
	setDrawerOpen(false);
}

async function goToHostedCheckout(button: HTMLButtonElement | null) {
	setLoading(button, true);
	setCartError('');

	try {
		const woo = getBrowserWooClient();
		const settings = await fetchHostedCheckoutSettings(import.meta.env.PUBLIC_WORDPRESS_URL);

		if (settings.authRequired && !woo.auth.isAuthenticated()) {
			window.location.assign('/logowanie/?redirect=checkout');
			return;
		}

		const result = getHostedCheckoutRedirectUrl(import.meta.env.PUBLIC_WORDPRESS_URL);
		if (!result.ok) {
			setCartError(result.error);
			setLoading(button, false);
			return;
		}

		window.location.assign(result.url);
	} catch (error) {
		setCartError(polishError(error instanceof Error ? error.message : ''));
		setLoading(button, false);
	}
}

function lineImage(line: CartLine): { src: string; alt: string } | null {
	const variationImage = line.variation?.node?.image;
	const productNode = line.product?.node;
	const productImage =
		productNode && 'image' in productNode
			? (productNode.image as {
					cartSourceUrl?: string | null;
					sourceUrl?: string | null;
					altText?: string | null;
				} | null)
			: null;

	const src =
		variationImage?.sourceUrl ||
		productImage?.cartSourceUrl ||
		productImage?.sourceUrl ||
		null;
	if (!src) return null;

	const alt =
		variationImage?.altText ||
		productImage?.altText ||
		productNode?.name ||
		'Produkt';
	return { src, alt };
}

function linePrice(line: CartLine): string {
	const variation = line.variation?.node;
	if (variation?.price) return formatPrice(variation.price);
	const product = line.product?.node;
	if (product && 'rawPrice' in product) {
		return formatPrice(product.rawPrice ?? product.price);
	}
	if (product && 'price' in product) {
		return formatPrice(product.price);
	}
	return '-';
}

function renderLineItem(line: CartLine): HTMLLIElement {
	const li = document.createElement('li');
	li.className = 'flex gap-4 border-b border-border-soft pb-5 last:border-b-0 last:pb-0';
	li.dataset.cartLineKey = line.key;

	const image = lineImage(line);
	const name = line.variation?.node?.name || line.product?.node?.name || 'Produkt';
	const qty = line.quantity ?? 1;

	const media = document.createElement('div');
	media.className = 'size-20 shrink-0 overflow-hidden bg-paper';
	if (image) {
		const img = document.createElement('img');
		img.src = image.src;
		img.alt = image.alt;
		img.className = 'size-full object-cover';
		img.loading = 'lazy';
		media.append(img);
	}

	const body = document.createElement('div');
	body.className = 'flex min-w-0 flex-1 flex-col gap-3';

	const top = document.createElement('div');
	top.className = 'flex items-start justify-between gap-3';

	const title = document.createElement('p');
	title.className =
		'm-0 font-display text-sm tracking-[0.1em] text-ink uppercase leading-snug';
	title.textContent = name;

	const price = document.createElement('p');
	price.className = 'm-0 shrink-0 font-sans text-sm tabular-nums text-ink';
	price.textContent = linePrice(line);

	top.append(title, price);

	const controls = document.createElement('div');
	controls.className = 'flex items-center justify-between gap-3';

	const qtyGroup = document.createElement('div');
	qtyGroup.className = 'inline-flex items-center border border-border-soft';

	const dec = document.createElement('button');
	dec.type = 'button';
	dec.className =
		'flex size-8 cursor-pointer items-center justify-center border-0 bg-transparent font-sans text-base text-ink';
	dec.setAttribute('aria-label', 'Zmniejsz ilość');
	dec.dataset.cartQty = 'dec';
	dec.dataset.cartKey = line.key;
	dec.textContent = '−';

	const qtyLabel = document.createElement('span');
	qtyLabel.className =
		'flex min-w-8 items-center justify-center font-sans text-sm tabular-nums text-ink';
	qtyLabel.dataset.cartQtyValue = '';
	qtyLabel.textContent = String(qty);

	const inc = document.createElement('button');
	inc.type = 'button';
	inc.className =
		'flex size-8 cursor-pointer items-center justify-center border-0 bg-transparent font-sans text-base text-ink';
	inc.setAttribute('aria-label', 'Zwiększ ilość');
	inc.dataset.cartQty = 'inc';
	inc.dataset.cartKey = line.key;
	inc.textContent = '+';

	qtyGroup.append(dec, qtyLabel, inc);

	const remove = document.createElement('button');
	remove.type = 'button';
	remove.className =
		'cursor-pointer border-0 bg-transparent p-0 font-sans text-xs tracking-[0.12em] text-ink/60 uppercase underline-offset-2 hover:text-ink hover:underline';
	remove.dataset.cartRemove = '';
	remove.dataset.cartKey = line.key;
	remove.textContent = 'Usuń';

	controls.append(qtyGroup, remove);
	body.append(top, controls);
	li.append(media, body);
	return li;
}

function renderCart(cart: CartFragment | null | undefined) {
	const empty = document.querySelector('[data-cart-empty]');
	const items = document.querySelector('[data-cart-items]');
	const footer = document.querySelector('[data-cart-footer]');
	const subtotal = document.querySelector('[data-cart-subtotal]');
	const total = document.querySelector('[data-cart-total]');

	const itemCount = cart?.contents?.itemCount ?? 0;
	const isEmpty = !cart || cart.isEmpty || itemCount === 0;
	updateBadge(itemCount);

	if (empty instanceof HTMLElement) {
		empty.hidden = !isEmpty;
		empty.classList.toggle('hidden', !isEmpty);
		empty.setAttribute('aria-hidden', isEmpty ? 'false' : 'true');
	}
	if (items instanceof HTMLElement) {
		items.hidden = isEmpty;
		items.classList.toggle('hidden', isEmpty);
		items.setAttribute('aria-hidden', isEmpty ? 'true' : 'false');
		items.replaceChildren();
		if (!isEmpty && cart?.contents?.nodes) {
			for (const line of cart.contents.nodes) {
				if (!line?.key) continue;
				items.append(renderLineItem(line));
			}
		}
	}
	if (footer instanceof HTMLElement) {
		footer.hidden = isEmpty;
		footer.classList.toggle('hidden', isEmpty);
		footer.setAttribute('aria-hidden', isEmpty ? 'true' : 'false');
	}

	if (subtotal instanceof HTMLElement) {
		subtotal.textContent = formatPrice(cart?.subtotal);
	}
	if (total instanceof HTMLElement) {
		total.textContent = formatPrice(cart?.rawTotal ?? cart?.total);
	}
}

async function refreshCart() {
	if (refreshPromise) return refreshPromise;
	refreshPromise = (async () => {
		try {
			const woo = getBrowserWooClient();
			const { cart } = await woo.cart.getCart();
			renderCart(cart);
			setCartError('');
		} catch (error) {
			setCartError(polishError(error instanceof Error ? error.message : String(error)));
		} finally {
			refreshPromise = null;
		}
	})();
	return refreshPromise;
}

async function withMutation(action: () => Promise<unknown>) {
	setMutating(true);
	setCartError('');
	try {
		await action();
		await refreshCart();
	} catch (error) {
		setCartError(polishError(error instanceof Error ? error.message : String(error)));
	} finally {
		setMutating(false);
	}
}

async function addToCart(productId: number, button: HTMLButtonElement | null) {
	setLoading(button, true);
	setCartError('');
	try {
		const woo = getBrowserWooClient();
		await woo.cart.addToCart({ productId, quantity: 1 });
		await refreshCart();
		setDrawerOpen(true);
	} catch (error) {
		setCartError(polishError(error instanceof Error ? error.message : String(error)));
		setDrawerOpen(true);
	} finally {
		setLoading(button, false);
	}
}

function bindDocumentEvents() {
	if (documentBound) return;
	documentBound = true;

	document.addEventListener('click', (event) => {
		const target = event.target;
		if (!(target instanceof Element)) return;

		const openTrigger = target.closest('[data-cart-open]');
		if (openTrigger) {
			setDrawerOpen(true);
			void refreshCart();
			return;
		}

		const closeTrigger = target.closest(
			'[data-cart-close], [data-cart-continue], [data-cart-backdrop]',
		);
		if (closeTrigger) {
			setDrawerOpen(false);
			return;
		}

		const checkoutButton = target.closest<HTMLButtonElement>('[data-cart-checkout]');
		if (checkoutButton instanceof HTMLButtonElement && !checkoutButton.disabled) {
			goToHostedCheckout(checkoutButton);
			return;
		}

		const addButton = target.closest<HTMLButtonElement>('[data-add-to-cart]');
		if (addButton instanceof HTMLButtonElement && !addButton.disabled) {
			const productId = Number(addButton.dataset.productId);
			if (!Number.isFinite(productId) || productId <= 0) return;
			void addToCart(productId, addButton);
			return;
		}

		const lineControl = target.closest<HTMLElement>('[data-cart-key]');
		if (!lineControl) return;

		const key = lineControl.dataset.cartKey;
		if (!key) return;

		if (lineControl.hasAttribute('data-cart-remove')) {
			void withMutation(async () => {
				const woo = getBrowserWooClient();
				await woo.cart.removeItem(key);
			});
			return;
		}

		const qtyAction = lineControl.dataset.cartQty;
		if (!qtyAction) return;

		const line = document.querySelector(`[data-cart-line-key="${CSS.escape(key)}"]`);
		const qtyEl = line?.querySelector('[data-cart-qty-value]');
		const current = Number(qtyEl?.textContent ?? '1');
		const next = qtyAction === 'inc' ? current + 1 : current - 1;
		if (!Number.isFinite(next)) return;

		void withMutation(async () => {
			const woo = getBrowserWooClient();
			if (next <= 0) await woo.cart.removeItem(key);
			else await woo.cart.updateItemQuantity(key, next);
		});
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && isDrawerOpen()) setDrawerOpen(false);
	});
}

function initCartUi() {
	bindDocumentEvents();
	void refreshCart();
}

initCartUi();
document.addEventListener('astro:page-load', initCartUi);
