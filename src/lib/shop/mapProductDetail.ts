import type { GetProductQuery } from '../woocommerce/generated/sdk';
import { formatProductPrice } from './formatProductPrice';

export type ProductDetailModel = {
	databaseId: number;
	name: string;
	slug: string;
	type: string | null;
	imageUrl: string | null;
	imageAlt: string;
	priceLabel: string;
	descriptionHtml: string;
	canAddToCart: boolean;
	stockLabel: string | null;
};

type ProductNode = NonNullable<GetProductQuery['product']>;

function readField<T>(node: ProductNode, key: string): T | null {
	if (node != null && typeof node === 'object' && key in node) {
		return (node as Record<string, T | null | undefined>)[key] ?? null;
	}
	return null;
}

export function mapProductDetail(node: ProductNode | null | undefined): ProductDetailModel | null {
	if (!node?.databaseId || !node.name || !node.slug) return null;

	const rawPrice = readField<string>(node, 'rawPrice');
	const price = readField<string>(node, 'price');
	const stockStatus = readField<string>(node, 'stockStatus');
	const image = readField<{
		sourceUrl?: string | null;
		altText?: string | null;
	}>(node, 'image');

	const type = node.type ?? null;
	const inStock = stockStatus == null || stockStatus === 'IN_STOCK' || stockStatus === 'ON_BACKORDER';
	const canAddToCart = type === 'SIMPLE' && inStock;

	let stockLabel: string | null = null;
	if (type === 'SIMPLE' && !inStock) {
		stockLabel = 'Brak w magazynie';
	} else if (type && type !== 'SIMPLE') {
		stockLabel = 'Niedostępne online';
	}

	const descriptionHtml = (node.description ?? node.shortDescription ?? '').trim();

	return {
		databaseId: node.databaseId,
		name: node.name,
		slug: node.slug,
		type,
		imageUrl: image?.sourceUrl || null,
		imageAlt: image?.altText || node.name,
		priceLabel: formatProductPrice(rawPrice, price),
		descriptionHtml,
		canAddToCart,
		stockLabel,
	};
}
