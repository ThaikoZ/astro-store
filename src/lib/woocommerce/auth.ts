import type {
  DeleteUserMutationVariables,
  LoginMutation,
  RegisterCustomerInput,
  ResetPasswordKeyMutationVariables,
  UpdatePasswordMutationVariables,
} from './generated/sdk';
import type { SessionStore } from './session';
import type { WooClientInternals, WooRequest } from './types';

export type AuthResult = {
  success: boolean;
  error?: string;
  login?: NonNullable<LoginMutation['login']>;
};

export type AuthCartOptions = {
  /**
   * When true (default), re-fetch the cart after auth so WooGraphQL can merge the guest cart.
   * Set false for checkout handoff: keep the pre-auth Cart-Token so WP can merge once.
   */
  mergeGuestCart?: boolean;
};

export type AuthApi = ReturnType<typeof createAuthApi>;

/**
 * Login/register responses often return an empty customer cart-token and overwrite
 * the guest Cart-Token, wiping the headless cart. Restore the pre-auth session and
 * optionally re-fetch the cart so WooGraphQL can transfer guest items.
 */
async function restoreGuestCartAfterAuth(
  request: WooRequest,
  session: SessionStore,
  sessionBeforeAuth: string | null,
  mergeGuestCart: boolean,
): Promise<void> {
  if (!sessionBeforeAuth) return;

  session.setSessionToken(sessionBeforeAuth);

  if (!mergeGuestCart) return;

  try {
    await request((sdk) => sdk.getCart(), { skipAuthRefresh: true });
  } catch {
    // Keep the restored guest session even if cart reload fails.
  }
}

export function createAuthApi(internals: WooClientInternals) {
  const { request, session, refreshAuthToken } = internals;

  return {
    async login(
      username: string,
      password: string,
      options: AuthCartOptions = {},
    ): Promise<AuthResult> {
      const mergeGuestCart = options.mergeGuestCart !== false;
      const sessionBeforeAuth = session.getSessionToken();

      try {
        const result = await request((sdk) => sdk.login({ username, password }), {
          skipAuthRefresh: true,
        });
        const login = result.login;
        if (!login?.authToken) {
          return { success: false, error: 'Login failed: no auth token returned' };
        }
        session.setAuthToken(login.authToken);
        session.setRefreshToken(login.refreshToken ?? null);

        if (sessionBeforeAuth) {
          await restoreGuestCartAfterAuth(
            request,
            session,
            sessionBeforeAuth,
            mergeGuestCart,
          );
        } else {
          if (login.cartToken) session.syncCartToken(login.cartToken);
          if (login.customer?.cartToken) session.syncCartToken(login.customer.cartToken);
        }

        return { success: true, login };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Login failed',
        };
      }
    },

    async register(input: RegisterCustomerInput, options: AuthCartOptions = {}) {
      const mergeGuestCart = options.mergeGuestCart !== false;
      const sessionBeforeAuth = session.getSessionToken();
      const result = await request((sdk) => sdk.registerCustomer({ input }), {
        skipAuthRefresh: true,
      });

      if (sessionBeforeAuth) {
        await restoreGuestCartAfterAuth(
          request,
          session,
          sessionBeforeAuth,
          mergeGuestCart,
        );
      }

      return result;
    },

    async logout(): Promise<void> {
      // This WordPress schema has no logout mutation; clear local JWT/session cookies.
      session.clearAuth();
    },

    async refreshToken(force = false) {
      return refreshAuthToken(force);
    },

    async sendResetPasswordEmail(username: string) {
      return request((sdk) => sdk.ResetPasswordEmail({ username }), { skipAuthRefresh: true });
    },

    async resetPasswordWithKey(variables: ResetPasswordKeyMutationVariables) {
      return request((sdk) => sdk.ResetPasswordKey(variables), { skipAuthRefresh: true });
    },

    async updatePassword(variables: UpdatePasswordMutationVariables) {
      return request((sdk) => sdk.updatePassword(variables));
    },

    /** Requires elevated WP capabilities (shop manager / admin). Used by live test cleanup. */
    async deleteUser(variables: DeleteUserMutationVariables) {
      return request((sdk) => sdk.deleteUser(variables));
    },

    getViewerFromCart() {
      return request((sdk) => sdk.getCartSummary());
    },

    isAuthenticated() {
      return Boolean(session.getAuthToken() || session.getRefreshToken());
    },
  };
}
