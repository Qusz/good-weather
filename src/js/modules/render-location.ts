import { isHTMLParagraphElement } from './htmlTypePredicates';

export default function (city: string, country: string): void {
  const element: HTMLParagraphElement | null = document.querySelector(
    '.weather-card__location'
  );

  if (isHTMLParagraphElement(element)) {
    element.textContent = `${city}, ${country}`;
  }
}
