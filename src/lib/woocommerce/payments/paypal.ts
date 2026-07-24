export type PayPalRedirectOptions = {
  redirectUrl: string;
  orderId: string;
  orderKey: string;
  frontEndUrl: string;
  returnPath?: string;
  cancelPath?: string;
};

function replaceQueryParam(key: string, value: string, url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set(key, value);
    return parsed.toString();
  } catch {
    const pattern = new RegExp(`([?&])${key}=[^&]*`);
    if (pattern.test(url)) return url.replace(pattern, `$1${key}=${encodeURIComponent(value)}`);
    const join = url.includes('?') ? '&' : '?';
    return `${url}${join}${key}=${encodeURIComponent(value)}`;
  }
}

/** Shape PayPal redirect URL with return/cancel URLs for your Astro checkout routes. */
export function buildPayPalRedirectUrl(options: PayPalRedirectOptions): string {
  const returnPath = options.returnPath ?? `/order-summary?order=${options.orderId}&key=${options.orderKey}&from_paypal=true`;
  const cancelPath = options.cancelPath ?? '/checkout?cancel_order=true&from_paypal=true';
  const payPalReturnUrl = new URL(returnPath, options.frontEndUrl).toString();
  const payPalCancelUrl = new URL(cancelPath, options.frontEndUrl).toString();

  let redirectUrl = options.redirectUrl;
  redirectUrl = replaceQueryParam('return', payPalReturnUrl, redirectUrl);
  redirectUrl = replaceQueryParam('cancel_return', payPalCancelUrl, redirectUrl);
  redirectUrl = replaceQueryParam('bn', 'AstroStore_Cart', redirectUrl);
  return redirectUrl;
}

export function isPayPalGateway(paymentMethodId: string): boolean {
  return paymentMethodId === 'paypal' || paymentMethodId === 'ppcp-gateway';
}
