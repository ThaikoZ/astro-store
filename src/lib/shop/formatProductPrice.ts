import { decodeHtmlEntities, formatPrice, parsePriceAmount } from '../formatPrice';

/** Format Woo prices, including variable raw ranges like `1.00, 2.00` → `od 1,00 zł`. */
export function formatProductPrice(rawPrice?: string | null, price?: string | null): string {
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
