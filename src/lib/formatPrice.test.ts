import { describe, expect, it } from 'vitest';
import { decodeHtmlEntities, formatPrice, isZeroPrice, parsePriceAmount } from './formatPrice';

describe('formatPrice', () => {
	it('decodes WooCommerce nbsp entities', () => {
		expect(decodeHtmlEntities('550,00&nbsp;zł')).toBe('550,00 zł');
	});

	it('formats entity-encoded Polish prices', () => {
		expect(formatPrice('550,00&nbsp;zł')).toBe('550,00 zł');
	});

	it('formats raw numeric strings', () => {
		expect(formatPrice('550.00')).toBe('550,00 zł');
		expect(formatPrice(0)).toBe('0,00 zł');
	});

	it('detects zero prices with entities', () => {
		expect(isZeroPrice('0,00&nbsp;zł')).toBe(true);
		expect(isZeroPrice('550,00&nbsp;zł')).toBe(false);
	});

	it('parses Polish thousands separators', () => {
		expect(parsePriceAmount('1.234,56&nbsp;zł')).toBe(1234.56);
	});
});
