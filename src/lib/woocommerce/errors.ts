export type GraphQLErrorLike = {
  message?: string;
  extensions?: Record<string, unknown>;
  locations?: unknown;
  path?: unknown;
};

export class WooGraphQLError extends Error {
  readonly errors: GraphQLErrorLike[];
  readonly statusCode?: number;
  readonly isAuthError: boolean;

  constructor(message: string, options: { errors?: GraphQLErrorLike[]; statusCode?: number; cause?: unknown } = {}) {
    super(message, options.cause ? { cause: options.cause } : undefined);
    this.name = 'WooGraphQLError';
    this.errors = options.errors ?? [];
    this.statusCode = options.statusCode;
    this.isAuthError = isAuthRelated(message, this.errors);
  }
}

export function isAuthRelated(message: string, errors: GraphQLErrorLike[] = []): boolean {
  const haystack = [message, ...errors.map((error) => error.message ?? '')].join(' ').toLowerCase();
  return (
    haystack.includes('unauthorized') ||
    haystack.includes('unauthenticated') ||
    haystack.includes('expired') ||
    haystack.includes('invalid token') ||
    haystack.includes('jwt') ||
    haystack.includes('not authenticated') ||
    haystack.includes('permission')
  );
}

/** Prefer GraphQL `errors[].message` over graphql-request's verbose ClientError string. */
export function extractGraphQLErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== 'object') return null;

  const maybe = error as {
    message?: string;
    response?: { errors?: GraphQLErrorLike[] };
    errors?: GraphQLErrorLike[];
  };

  const fromList = (maybe.response?.errors ?? maybe.errors ?? [])
    .map((item) => (typeof item.message === 'string' ? item.message.trim() : ''))
    .filter(Boolean);
  if (fromList.length > 0) return fromList.join('; ');

  if (typeof maybe.message === 'string' && maybe.message.trim()) {
    const raw = maybe.message.trim();
    // ClientError often looks like: "Human message: {"response":...}"
    const colonIdx = raw.indexOf(': {');
    if (colonIdx > 0) {
      const head = raw.slice(0, colonIdx).trim();
      if (head && !head.startsWith('{')) return head;
    }
    if (!raw.startsWith('{') && !raw.includes('"registerCustomer"')) return raw;
  }

  return null;
}

export function toWooGraphQLError(error: unknown): WooGraphQLError {
  if (error instanceof WooGraphQLError) return error;

  if (error && typeof error === 'object') {
    const maybe = error as {
      message?: string;
      response?: { status?: number; errors?: GraphQLErrorLike[]; data?: unknown };
      errors?: GraphQLErrorLike[];
    };
    const errors = maybe.response?.errors ?? maybe.errors ?? [];
    const message =
      extractGraphQLErrorMessage(error) ||
      errors.map((item) => item.message).filter(Boolean).join('; ') ||
      maybe.message ||
      'GraphQL request failed';
    return new WooGraphQLError(message, {
      errors,
      statusCode: maybe.response?.status,
      cause: error,
    });
  }

  return new WooGraphQLError(error instanceof Error ? error.message : 'Unknown GraphQL error', { cause: error });
}

/**
 * WooGraphQL JWT sometimes returns HTTP 403 with a full GraphQL `data` payload.
 * graphql-request throws ClientError in that case; recover usable data when present.
 */
export function extractGraphQLDataFromError<T = unknown>(error: unknown): T | null {
  if (!error || typeof error !== 'object') return null;
  const response = (error as { response?: { data?: T; errors?: GraphQLErrorLike[] } }).response;
  if (!response || response.data == null) return null;
  if (Array.isArray(response.errors) && response.errors.length > 0) return null;
  return response.data;
}
