import { COOKIE_NAMES, getBrowserWooClient } from '../lib/woocommerce';

const REMEMBER_MAX_AGE = 60 * 60 * 24 * 30;

function setStatus(el: Element | null, message: string, kind: 'error' | 'success' | 'info' = 'error') {
	if (!(el instanceof HTMLElement)) return;
	el.hidden = !message;
	el.classList.toggle('hidden', !message);
	el.textContent = message;
	el.dataset.kind = kind;
	el.classList.toggle('text-red-800', kind === 'error');
	el.classList.toggle('text-ink/70', kind === 'info' || kind === 'success');
}

function setLoading(button: HTMLButtonElement | null, loading: boolean) {
	if (!button) return;
	button.disabled = loading;
	button.setAttribute('aria-busy', loading ? 'true' : 'false');
	button.classList.toggle('opacity-60', loading);
}

function stripHtml(value: string): string {
	return value
		.replace(/<[^>]*>/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#039;|&apos;/g, "'")
		.replace(/\s+/g, ' ')
		.trim();
}

function polishAuthError(message: string): string {
	const cleaned = stripHtml(message);
	const lower = cleaned.toLowerCase();
	if (
		lower.includes('failed to fetch') ||
		lower.includes('networkerror') ||
		lower.includes('load failed') ||
		lower.includes('network request failed')
	) {
		return 'Nie udało się połączyć z serwerem. Sprawdź połączenie albo zrestartuj serwer deweloperski (proxy GraphQL).';
	}
	if (lower.includes('incorrect_password') || lower.includes('incorrect password')) {
		return 'Nieprawidłowe hasło.';
	}
	if (
		lower.includes('not registered') ||
		lower.includes('invalid_username') ||
		lower.includes('invalid_email') ||
		lower.includes('unknown username')
	) {
		return 'Nieprawidłowa nazwa użytkownika lub e-mail.';
	}
	if (lower.includes('existing_user') || lower.includes('already registered')) {
		return 'Konto z tym e-mailem lub nazwą użytkownika już istnieje.';
	}
	if (lower.includes('empty_password') || lower.includes('empty password')) {
		return 'Podaj hasło.';
	}
	return cleaned || 'Coś poszło nie tak. Spróbuj ponownie.';
}

function persistRememberMe(remember: boolean) {
	if (!remember || typeof document === 'undefined') return;
	const names = [COOKIE_NAMES.authToken, COOKIE_NAMES.refreshToken];
	for (const name of names) {
		const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
		if (!match?.[1]) continue;
		const value = decodeURIComponent(match[1]);
		document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=/; Max-Age=${REMEMBER_MAX_AGE}; SameSite=Lax`;
	}
}

function initLoginForm() {
	const form = document.querySelector<HTMLFormElement>('[data-auth-form="login"]');
	if (!form || form.dataset.bound === 'true') return;
	form.dataset.bound = 'true';

	const status = form.querySelector('[data-auth-status]');
	const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		setStatus(status, '');
		setLoading(submit, true);

		const data = new FormData(form);
		const username = String(data.get('username') ?? '').trim();
		const password = String(data.get('password') ?? '');
		const remember = data.get('remember') === 'on';

		try {
			const woo = getBrowserWooClient();
			const result = await woo.auth.login(username, password);
			if (!result.success) {
				setStatus(status, polishAuthError(result.error ?? ''));
				return;
			}
			persistRememberMe(remember);
			window.location.href = '/moje-konto/';
		} catch (error) {
			setStatus(status, polishAuthError(error instanceof Error ? error.message : ''));
		} finally {
			setLoading(submit, false);
		}
	});
}

function initRegisterForm() {
	const form = document.querySelector<HTMLFormElement>('[data-auth-form="register"]');
	if (!form || form.dataset.bound === 'true') return;
	form.dataset.bound = 'true';

	const status = form.querySelector('[data-auth-status]');
	const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		setStatus(status, '');

		const data = new FormData(form);
		const email = String(data.get('email') ?? '').trim();
		const username = String(data.get('username') ?? '').trim();
		const password = String(data.get('password') ?? '');
		const passwordConfirm = String(data.get('passwordConfirm') ?? '');
		const acceptedTerms = data.get('terms') === 'on';

		if (password !== passwordConfirm) {
			setStatus(status, 'Hasła nie są takie same.');
			return;
		}

		if (!acceptedTerms) {
			setStatus(status, 'Aby założyć konto, zaakceptuj regulamin i politykę prywatności.');
			return;
		}

		setLoading(submit, true);
		try {
			const woo = getBrowserWooClient();
			await woo.auth.register({
				email,
				username,
				password,
				authenticate: true,
			});
			const login = await woo.auth.login(username, password);
			if (!login.success) {
				setStatus(
					status,
					'Konto utworzone, ale logowanie nie powiodło się. Spróbuj zalogować się ręcznie.',
					'info',
				);
				window.setTimeout(() => {
					window.location.href = '/logowanie/';
				}, 1600);
				return;
			}
			window.location.href = '/moje-konto/';
		} catch (error) {
			setStatus(status, polishAuthError(error instanceof Error ? error.message : ''));
		} finally {
			setLoading(submit, false);
		}
	});
}

function initForgotForm() {
	const form = document.querySelector<HTMLFormElement>('[data-auth-form="forgot"]');
	if (!form || form.dataset.bound === 'true') return;
	form.dataset.bound = 'true';

	const status = form.querySelector('[data-auth-status]');
	const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		setStatus(status, '');
		setLoading(submit, true);

		const data = new FormData(form);
		const username = String(data.get('username') ?? '').trim();

		try {
			const woo = getBrowserWooClient();
			const result = await woo.auth.sendResetPasswordEmail(username);
			if (!result.sendPasswordResetEmail?.success) {
				setStatus(status, 'Nie udało się wysłać wiadomości. Sprawdź dane i spróbuj ponownie.');
				return;
			}
			setStatus(
				status,
				'Jeśli konto istnieje, wysłaliśmy instrukcję resetu hasła na powiązany adres e-mail.',
				'success',
			);
			form.reset();
		} catch (error) {
			setStatus(status, polishAuthError(error instanceof Error ? error.message : ''));
		} finally {
			setLoading(submit, false);
		}
	});
}

function initResetForm() {
	const form = document.querySelector<HTMLFormElement>('[data-auth-form="reset"]');
	if (!form || form.dataset.bound === 'true') return;
	form.dataset.bound = 'true';

	const status = form.querySelector('[data-auth-status]');
	const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
	const params = new URLSearchParams(window.location.search);
	const key = params.get('key') ?? '';
	const login = params.get('login') ?? '';

	if (!key || !login) {
		setStatus(
			status,
			'Link resetu jest niekompletny. Użyj odnośnika z wiadomości e-mail.',
			'error',
		);
	}

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		setStatus(status, '');

		if (!key || !login) {
			setStatus(status, 'Brakuje parametrów key/login w adresie URL.');
			return;
		}

		const data = new FormData(form);
		const password = String(data.get('password') ?? '');
		const passwordConfirm = String(data.get('passwordConfirm') ?? '');

		if (password !== passwordConfirm) {
			setStatus(status, 'Hasła nie są takie same.');
			return;
		}

		setLoading(submit, true);
		try {
			const woo = getBrowserWooClient();
			await woo.auth.resetPasswordWithKey({ key, login, password });
			setStatus(status, 'Hasło zostało zmienione. Przekierowujemy do logowania…', 'success');
			window.setTimeout(() => {
				window.location.href = '/logowanie/';
			}, 1200);
		} catch (error) {
			setStatus(status, polishAuthError(error instanceof Error ? error.message : ''));
		} finally {
			setLoading(submit, false);
		}
	});
}

function initAccountPage() {
	const root = document.querySelector('[data-auth-account]');
	if (!(root instanceof HTMLElement) || root.dataset.bound === 'true') return;
	root.dataset.bound = 'true';

	const logoutBtn = root.querySelector<HTMLButtonElement>('[data-auth-logout]');
	const status = root.querySelector('[data-auth-status]');

	try {
		const woo = getBrowserWooClient();
		if (!woo.auth.isAuthenticated()) {
			window.location.href = '/logowanie/';
			return;
		}
	} catch {
		window.location.href = '/logowanie/';
		return;
	}

	logoutBtn?.addEventListener('click', async () => {
		setLoading(logoutBtn, true);
		try {
			const woo = getBrowserWooClient();
			await woo.auth.logout();
			window.location.href = '/logowanie/';
		} catch (error) {
			setStatus(status, polishAuthError(error instanceof Error ? error.message : ''));
			setLoading(logoutBtn, false);
		}
	});
}

function initPasswordToggles() {
	const toggles = document.querySelectorAll<HTMLButtonElement>('[data-auth-password-toggle]');
	for (const toggle of toggles) {
		if (toggle.dataset.bound === 'true') continue;
		toggle.dataset.bound = 'true';

		toggle.addEventListener('click', () => {
			const wrap = toggle.closest('div');
			const input = wrap?.querySelector<HTMLInputElement>('[data-auth-password-input]');
			if (!input) return;

			const show = input.type === 'password';
			input.type = show ? 'text' : 'password';
			toggle.setAttribute('aria-pressed', show ? 'true' : 'false');
			toggle.setAttribute('aria-label', show ? 'Ukryj hasło' : 'Pokaż hasło');

			const iconShow = toggle.querySelector('[data-auth-password-icon="show"]');
			const iconHide = toggle.querySelector('[data-auth-password-icon="hide"]');
			iconShow?.classList.toggle('hidden', show);
			iconHide?.classList.toggle('hidden', !show);
		});
	}
}

export function initAuthUi() {
	initPasswordToggles();
	initLoginForm();
	initRegisterForm();
	initForgotForm();
	initResetForm();
	initAccountPage();
}

initAuthUi();
document.addEventListener('astro:page-load', initAuthUi);
