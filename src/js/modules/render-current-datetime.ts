import getDateTime from 'utils/datetime';
import { isHTMLParagraphElement } from './html-type-predicates';

export default function (time: string, timezone: string): void {
  const element: HTMLParagraphElement | null = document.querySelector(
    '.weather-card__date'
  );

  if (isHTMLParagraphElement(element)) {
    element.textContent = getDateTime('long', time, timezone);
  }
}
