import { decodeHtmlEntities, formatPrice, parsePriceAmount } from '../formatPrice';
import type { GetProductsQuery } from '../woocommerce/generated/sdk';

export type ProductCardModel = {
	databaseId: number;
	name: string;
	slug: string;
	type: string | null;
	imageUrl: string | null;
	imageAlt: string;
	priceLabel: string;
	canAddToCart: boolean;
	stockLabel: string | null;
};

type ProductNode = NonNullable<NonNullable<GetProductsQuery['products']>['nodes']>[number];

function hasPriceFields(
	node: ProductNode,
): node is ProductNode & {
	price?: string | null;
	rawPrice?: string | null;
	image?: {
		sourceUrl?: string | null;
		altText?: string | null;
		productCardSourceUrl?: string | null;
	} | null;
	stockStatus?: string | null;
} {
	return node != null && typeof node === 'object';
}

/** Format Woo prices, including variable raw ranges like `1.00, 2.00` → `od 1,00 zł`. */
function formatProductPrice(rawPrice?: string | null, price?: string | null): string {
	const raw = rawPrice?.trim() ?? '';
	const isRawRange = /^\d+(\.\d+)?(,\s*\d+(\.\d+)?)+$/.test(raw);

	if (isRawRange) {
		const parts = raw
			.split(',')
			.map((part) => parsePriceAmount(part.trim()))
			.filter((amount): amount is number => amount != null);
		if (parts.length > 0) {
			const min = Math.min(...parts);
			const max = Math.max(...parts);
			if (min === max) return formatPrice(min);
			return `od ${formatPrice(min)}`;
		}
	}

	if (raw || price) return formatPrice(raw || price);

	const decoded = decodeHtmlEntities(String(price ?? ''));
	return decoded || '-';
}

export function mapProductCard(node: ProductNode): ProductCardModel | null {
	if (!node?.databaseId || !node.name) return null;

	const typed = hasPriceFields(node) ? node : null;
	const rawPrice = typed && 'rawPrice' in typed ? typed.rawPrice : null;
	const price = typed && 'price' in typed ? typed.price : null;
	const stockStatus = typed && 'stockStatus' in typed ? typed.stockStatus : null;
	const image = typed && 'image' in typed ? typed.image : null;

	const type = node.type ?? null;
	const inStock = stockStatus == null || stockStatus === 'IN_STOCK' || stockStatus === 'ON_BACKORDER';
	const canAddToCart = type === 'SIMPLE' && inStock;

	let stockLabel: string | null = null;
	if (type === 'SIMPLE' && !inStock) {
		stockLabel = 'Brak w magazynie';
	} else if (type && type !== 'SIMPLE') {
		stockLabel = 'Niedostępne online';
	}

	return {
		databaseId: node.databaseId,
		name: node.name,
		slug: node.slug ?? '',
		type,
		imageUrl: image?.productCardSourceUrl || image?.sourceUrl || null,
		imageAlt: image?.altText || node.name,
		priceLabel: formatProductPrice(rawPrice, price),
		canAddToCart,
		stockLabel,
	};
}
