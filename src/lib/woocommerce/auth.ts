import type {
  DeleteUserMutationVariables,
  LoginMutation,
  RegisterCustomerInput,
  ResetPasswordKeyMutationVariables,
  UpdatePasswordMutationVariables,
} from './generated/sdk';
import type { WooClientInternals } from './types';

export type AuthResult = {
  success: boolean;
  error?: string;
  login?: NonNullable<LoginMutation['login']>;
};

export type AuthApi = ReturnType<typeof createAuthApi>;

export function createAuthApi(internals: WooClientInternals) {
  const { request, session, refreshAuthToken } = internals;

  return {
    async login(username: string, password: string): Promise<AuthResult> {
      try {
        const result = await request((sdk) => sdk.login({ username, password }), { skipAuthRefresh: true });
        const login = result.login;
        if (!login?.authToken) {
          return { success: false, error: 'Login failed: no auth token returned' };
        }
        session.setAuthToken(login.authToken);
        session.setRefreshToken(login.refreshToken ?? null);
        if (login.cartToken) session.syncCartToken(login.cartToken);
        if (login.customer?.cartToken) session.syncCartToken(login.customer.cartToken);
        return { success: true, login };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Login failed',
        };
      }
    },

    async register(input: RegisterCustomerInput) {
      return request((sdk) => sdk.registerCustomer({ input }), { skipAuthRefresh: true });
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
