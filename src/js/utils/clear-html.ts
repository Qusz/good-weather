import { isHTMLElement } from '../modules/htmlTypePredicates';

export default function (element: HTMLElement | null): void {
  if (isHTMLElement(element)) {
    if (element.innerHTML) {
      // eslint-disable-next-line no-param-reassign
      element.innerHTML = '';
    }
  }
}
