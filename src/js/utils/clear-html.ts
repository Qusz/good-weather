import TypePredicates from '../modules/html-type-predicates';

export default function (element: HTMLElement | null): void {
  const typePredicates = new TypePredicates();

  if (typePredicates.isHTMLElement(element)) {
    if (element.innerHTML) {
      // eslint-disable-next-line no-param-reassign
      element.innerHTML = '';
    }
  }
}
