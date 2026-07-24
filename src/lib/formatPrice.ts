const HTML_ENTITIES: Record<string, string> = {
	nbsp: '\u00A0',
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	apos: "'",
	'#39': "'",
};

/**
 * Decode common HTML entities from WooCommerce formatted money strings
 * (e.g. `550,00&nbsp;zł` → `550,00 zł`).
 */
export function decodeHtmlEntities(value: string): string {
	return value
		.replace(/&([a-z]+|#\d+);/gi, (match, entity: string) => {
			const key = entity.toLowerCase();
			if (key in HTML_ENTITIES) return HTML_ENTITIES[key];
			if (key.startsWith('#') && key.slice(1)) {
				const code = Number(key.slice(1));
				if (Number.isFinite(code)) return String.fromCharCode(code);
			}
			return match;
		})
		.replace(/\u00A0/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * Parse a WooCommerce price string (formatted or RAW) into a number.
 * Accepts `550.00`, `550,00`, `550,00 zł`, `550,00&nbsp;zł`.
 */
export function parsePriceAmount(value: string | number | null | undefined): number | null {
	if (value == null || value === '') return null;
	if (typeof value === 'number') return Number.isFinite(value) ? value : null;

	const cleaned = decodeHtmlEntities(String(value))
		.replace(/[^\d,.-]/g, '')
		.trim();
	if (!cleaned) return null;

	// Prefer comma as decimal when both separators appear (PL style: 1.234,56)
	const normalized =
		cleaned.includes(',') && cleaned.includes('.')
			? cleaned.replace(/\./g, '').replace(',', '.')
			: cleaned.replace(',', '.');

	const amount = Number(normalized);
	return Number.isFinite(amount) ? amount : null;
}

export function isZeroPrice(value: string | number | null | undefined): boolean {
	const amount = parsePriceAmount(value);
	return amount != null && Math.abs(amount) < 0.000_001;
}

type FormatPriceOptions = {
	currency?: string;
	locale?: string;
	fallback?: string;
};

/**
 * Format a price for display. Decodes Woo HTML entities and formats with pl-PL zł by default.
 * Falls back to the decoded string when the value cannot be parsed as a number.
 */
export function formatPrice(
	value: string | number | null | undefined,
	options: FormatPriceOptions = {},
): string {
	const { currency = 'PLN', locale = 'pl-PL', fallback = '-' } = options;
	if (value == null || value === '') return fallback;

	const amount = parsePriceAmount(value);
	if (amount != null) {
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount);
	}

	const decoded = decodeHtmlEntities(String(value));
	return decoded || fallback;
}
