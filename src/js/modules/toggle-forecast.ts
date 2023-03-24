import type { SetNonNullable } from 'type-fest';

import { isHTMLDivElement, isHTMLSpanElement } from './html-type-predicates';

type Elements = {
  parent: HTMLDivElement | null;
  toggle: HTMLDivElement | null;
  caption: HTMLSpanElement | null;
  body: HTMLDivElement | null;
};

type GuaranteedElements = SetNonNullable<Elements>;

function isGuaranteedElements(
  elements: Elements | GuaranteedElements
): elements is GuaranteedElements {
  return (
    isHTMLDivElement(elements.parent) &&
    isHTMLDivElement(elements.toggle) &&
    isHTMLSpanElement(elements.caption) &&
    isHTMLDivElement(elements.body)
  );
}

export default function (): void {
  const ELEMENTS: Elements = {
    parent: document.querySelector('[data-forecast]'),
    toggle: document.querySelector('[data-forecast-header-wrapper]'),
    caption: document.querySelector('[data-forecast-caption]'),
    body: document.querySelector('[data-forecast-body]')
  };

  const activeClass = 'weather-card__forecast--active';
  const defaultCaption = 'Show forecast';
  const activeCaption = 'Hide forecast';

  if (isGuaranteedElements(ELEMENTS)) {
    ELEMENTS.toggle.addEventListener('click', () => {
      ELEMENTS.parent.classList.toggle(activeClass);

      if (ELEMENTS.body.style.maxHeight) {
        ELEMENTS.body.style.maxHeight = '';
        ELEMENTS.caption.textContent = defaultCaption;
      } else {
        ELEMENTS.body.style.maxHeight = `${ELEMENTS.body!.scrollHeight}px`;
        ELEMENTS.caption.textContent = activeCaption;
      }
    });
  }
}
