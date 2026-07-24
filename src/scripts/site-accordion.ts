function setAccordionOpen(
	trigger: HTMLButtonElement,
	panel: HTMLElement,
	open: boolean,
) {
	trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
	panel.classList.toggle('is-open', open);
}

export function initSiteAccordions() {
	document.querySelectorAll('[data-accordion]').forEach((root) => {
		if (!(root instanceof HTMLElement)) return;
		if (root.dataset.accordionBound === 'true') return;
		root.dataset.accordionBound = 'true';

		const items = [...root.querySelectorAll('[data-accordion-item]')];

		items.forEach((item) => {
			const trigger = item.querySelector('[data-accordion-trigger]');
			const panel = item.querySelector('[data-accordion-panel]');
			if (!(trigger instanceof HTMLButtonElement) || !(panel instanceof HTMLElement)) return;

			trigger.addEventListener('click', () => {
				const willOpen = trigger.getAttribute('aria-expanded') !== 'true';

				items.forEach((other) => {
					const otherTrigger = other.querySelector('[data-accordion-trigger]');
					const otherPanel = other.querySelector('[data-accordion-panel]');
					if (
						!(otherTrigger instanceof HTMLButtonElement) ||
						!(otherPanel instanceof HTMLElement)
					) {
						return;
					}
					setAccordionOpen(otherTrigger, otherPanel, false);
				});

				if (willOpen) {
					setAccordionOpen(trigger, panel, true);
				}
			});
		});
	});
}
