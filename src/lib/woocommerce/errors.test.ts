import { describe, expect, it } from 'vitest';
import { extractGraphQLDataFromError } from './errors';

describe('extractGraphQLDataFromError', () => {
  it('recovers data from HTTP 403 ClientError-shaped payloads', () => {
    const data = { cart: { isEmpty: true }, viewer: { databaseId: 4 } };
    const error = {
      response: {
        status: 403,
        data,
        errors: undefined,
      },
    };

    expect(extractGraphQLDataFromError(error)).toEqual(data);
  });

  it('returns null when GraphQL errors are present', () => {
    const error = {
      response: {
        status: 403,
        data: { cart: null },
        errors: [{ message: 'forbidden' }],
      },
    };

    expect(extractGraphQLDataFromError(error)).toBeNull();
  });
});
