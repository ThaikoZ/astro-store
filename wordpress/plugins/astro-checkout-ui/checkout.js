(function () {
	function ready(fn) {
		if (document.readyState !== 'loading') fn();
		else document.addEventListener('DOMContentLoaded', fn);
	}

	function selectMethodCard(e) {
		var li = e.target.closest(
			'#payment ul.payment_methods > li, .astro-pay-shipping-methods #shipping_method > li, ul#shipping_method > li'
		);
		if (!li) return;
		if (e.target.closest('a, button, textarea, select')) return;

		var input = li.querySelector('input[type="radio"]');
		if (!input || input.disabled) return;
		if (e.target === input) return;

		if (!input.checked) {
			input.click();
		} else if (typeof input.focus === 'function') {
			input.focus({ preventScroll: true });
		}
	}

	function setCompanyFieldRequired(fieldId, on) {
		var input = document.getElementById(fieldId);
		var row = document.getElementById(fieldId + '_field');
		if (!input || !row) return;

		row.hidden = !on;
		row.setAttribute('aria-hidden', on ? 'false' : 'true');
		row.classList.toggle('astro-pay-company-field--required', on);

		input.required = on;
		input.setAttribute('aria-required', on ? 'true' : 'false');
		if (!on) {
			input.value = '';
		}

		var label = row.querySelector('label');
		if (!label) return;

		var optional = label.querySelector('.optional');
		if (optional) {
			optional.hidden = on;
			optional.style.display = on ? 'none' : '';
		}

		var requiredMark = label.querySelector('abbr.required, span.required');
		if (on) {
			if (!requiredMark) {
				requiredMark = document.createElement('abbr');
				requiredMark.className = 'required';
				requiredMark.title = 'wymagane';
				requiredMark.setAttribute('aria-label', 'wymagane');
				requiredMark.dataset.astroAdded = '1';
				requiredMark.textContent = '*';
				label.appendChild(document.createTextNode('\u00a0'));
				label.appendChild(requiredMark);
			} else {
				requiredMark.hidden = false;
				requiredMark.style.display = '';
			}
		} else if (requiredMark) {
			if (requiredMark.dataset.astroAdded === '1') {
				requiredMark.remove();
			} else {
				requiredMark.hidden = true;
				requiredMark.style.display = 'none';
			}
		}
	}

	function syncBuyAsCompany() {
		var form = document.querySelector('form.checkout.woocommerce-checkout');
		var checkbox = document.getElementById('billing_buy_as_company');
		if (!form || !checkbox) return;

		var on = !!checkbox.checked;
		form.classList.toggle('astro-pay-company-on', on);

		setCompanyFieldRequired('billing_company', on);
		setCompanyFieldRequired('billing_nip', on);

		// Keep NIP directly under company in the DOM.
		var companyRow = document.getElementById('billing_company_field');
		var nipRow = document.getElementById('billing_nip_field');
		if (companyRow && nipRow && companyRow.nextElementSibling !== nipRow) {
			companyRow.insertAdjacentElement('afterend', nipRow);
		}
	}

	function collectNotices() {
		var slot = document.querySelector('[data-astro-notices]');
		var root = document.querySelector('.astro-pay-root');
		if (!slot || !root) return;

		var nodes = root.querySelectorAll(
			'.woocommerce-notices-wrapper, .woocommerce-NoticeGroup, .woocommerce-NoticeGroup-checkout, .woocommerce-message, .woocommerce-info, .woocommerce-error, ul.woocommerce-error'
		);

		nodes.forEach(function (node) {
			if (slot.contains(node)) return;
			if (node.closest('[data-astro-notices]')) return;
			// Skip nested messages already inside a wrapper we are moving.
			if (
				node.matches('.woocommerce-message, .woocommerce-info, .woocommerce-error, ul.woocommerce-error') &&
				node.closest('.woocommerce-notices-wrapper, .woocommerce-NoticeGroup, .woocommerce-NoticeGroup-checkout')
			) {
				return;
			}
			slot.appendChild(node);
		});
	}

	ready(function () {
		document.addEventListener('click', selectMethodCard);
		collectNotices();

		if (typeof window.jQuery !== 'undefined') {
			window.jQuery(document.body).on(
				'updated_checkout applied_coupon removed_coupon checkout_error',
				function () {
					window.setTimeout(collectNotices, 0);
					window.setTimeout(collectNotices, 50);
				}
			);
		}

		var observer = new MutationObserver(function () {
			collectNotices();
		});
		var root = document.querySelector('.astro-pay-root');
		if (root) {
			observer.observe(root, { childList: true, subtree: true });
		}

		var buyAsCompany = document.getElementById('billing_buy_as_company');
		if (buyAsCompany) {
			var existingCompany = document.getElementById('billing_company');
			var existingNip = document.getElementById('billing_nip');
			if (
				!buyAsCompany.checked &&
				((existingCompany && existingCompany.value.trim()) ||
					(existingNip && existingNip.value.trim()))
			) {
				buyAsCompany.checked = true;
			}
			buyAsCompany.addEventListener('change', syncBuyAsCompany);
			syncBuyAsCompany();
		}

		var couponInput = document.querySelector('[data-astro-coupon-input]');
		var couponApply = document.querySelector('[data-astro-coupon-apply]');
		var nativeCoupon = document.querySelector('form.checkout_coupon.astro-pay-coupon-native');
		var nativeInput = nativeCoupon
			? nativeCoupon.querySelector('input[name="coupon_code"]')
			: null;

		function applyCoupon() {
			if (!nativeCoupon || !nativeInput || !couponInput) return;
			var code = (couponInput.value || '').trim();
			if (!code) {
				couponInput.focus();
				return;
			}
			nativeInput.value = code;
			var btn = nativeCoupon.querySelector('[name="apply_coupon"]');
			if (btn && typeof btn.click === 'function') {
				btn.click();
				return;
			}
			if (typeof nativeCoupon.requestSubmit === 'function') {
				nativeCoupon.requestSubmit();
			} else {
				var evt = new Event('submit', { bubbles: true, cancelable: true });
				if (nativeCoupon.dispatchEvent(evt) !== false) {
					nativeCoupon.submit();
				}
			}
		}

		if (couponApply) {
			couponApply.addEventListener('click', function (e) {
				e.preventDefault();
				applyCoupon();
			});
		}

		if (couponInput) {
			couponInput.addEventListener('keydown', function (e) {
				if (e.key === 'Enter') {
					e.preventDefault();
					applyCoupon();
				}
			});
		}
	});
})();
