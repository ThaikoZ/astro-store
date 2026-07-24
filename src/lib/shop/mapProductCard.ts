import type { GetProductsQuery } from '../woocommerce/generated/sdk';
import { formatProductPrice } from './formatProductPrice';

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
	href: string | null;
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

export function mapProductCard(node: ProductNode): ProductCardModel | null {
	if (!node?.databaseId || !node.name) return null;

	const typed = hasPriceFields(node) ? node : null;
	const rawPrice = typed && 'rawPrice' in typed ? typed.rawPrice : null;
	const price = typed && 'price' in typed ? typed.price : null;
	const stockStatus = typed && 'stockStatus' in typed ? typed.stockStatus : null;
	const image = typed && 'image' in typed ? typed.image : null;

	const type = node.type ?? null;
	const inStock =
		stockStatus == null || stockStatus === 'IN_STOCK' || stockStatus === 'ON_BACKORDER';
	// Only simple in-stock products can be added from the grid (no variation picker yet).
	const canAddToCart = type === 'SIMPLE' && inStock;

	let stockLabel: string | null = null;
	if (!canAddToCart) {
		if (type === 'SIMPLE' && stockStatus === 'OUT_OF_STOCK') {
			stockLabel = 'Brak w magazynie';
		} else {
			stockLabel = 'Niedostępne online';
		}
	}

	const slug = node.slug ?? '';

	return {
		databaseId: node.databaseId,
		name: node.name,
		slug,
		type,
		imageUrl: image?.productCardSourceUrl || image?.sourceUrl || null,
		imageAlt: image?.altText || node.name,
		priceLabel: formatProductPrice(rawPrice, price),
		canAddToCart,
		stockLabel,
		href: slug ? `/szkolenia-online/${slug}/` : null,
	};
}
