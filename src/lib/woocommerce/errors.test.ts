import { describe, expect, it } from 'vitest';
import { extractGraphQLDataFromError, extractGraphQLErrorMessage, toWooGraphQLError } from './errors';

describe('extractGraphQLErrorMessage', () => {
  it('prefers response.errors[].message over verbose ClientError text', () => {
    const error = {
      message:
        'Konto jest już zarejestrowane. Zaloguj się.: {"response":{"errors":[{"message":"Konto jest już zarejestrowane. Zaloguj się."}]}}',
      response: {
        status: 200,
        errors: [
          {
            message:
              'Konto jest już zarejestrowane w adriansudak@outlook.com. Zaloguj się lub użyj innego adresu e-mail.',
          },
        ],
      },
    };

    expect(extractGraphQLErrorMessage(error)).toBe(
      'Konto jest już zarejestrowane w adriansudak@outlook.com. Zaloguj się lub użyj innego adresu e-mail.',
    );
    expect(toWooGraphQLError(error).message).toBe(
      'Konto jest już zarejestrowane w adriansudak@outlook.com. Zaloguj się lub użyj innego adresu e-mail.',
    );
  });

  it('strips JSON dump from ClientError message when errors array is missing', () => {
    const error = {
      message: 'Konto jest już zarejestrowane.: {"response":{"data":null}}',
    };
    expect(extractGraphQLErrorMessage(error)).toBe('Konto jest już zarejestrowane.');
  });
});

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
