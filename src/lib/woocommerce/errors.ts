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

export function toWooGraphQLError(error: unknown): WooGraphQLError {
  if (error instanceof WooGraphQLError) return error;

  if (error && typeof error === 'object') {
    const maybe = error as {
      message?: string;
      response?: { status?: number; errors?: GraphQLErrorLike[] };
      errors?: GraphQLErrorLike[];
    };
    const errors = maybe.response?.errors ?? maybe.errors ?? [];
    const message = maybe.message || errors.map((item) => item.message).filter(Boolean).join('; ') || 'GraphQL request failed';
    return new WooGraphQLError(message, {
      errors,
      statusCode: maybe.response?.status,
      cause: error,
    });
  }

  return new WooGraphQLError(error instanceof Error ? error.message : 'Unknown GraphQL error', { cause: error });
}
