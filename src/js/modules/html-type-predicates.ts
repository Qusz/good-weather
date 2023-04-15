export default class TypePredicates {
  isHTMLElement(node: HTMLElement | null): node is HTMLElement {
    return node !== null;
  }

  isHTMLFormElement(node: HTMLFormElement | null): node is HTMLFormElement {
    return node !== null;
  }

  isHTMLDivElement(node: HTMLDivElement | null): node is HTMLDivElement {
    return node !== null;
  }

  isHTMLInputElement(node: HTMLInputElement | null): node is HTMLInputElement {
    return node !== null;
  }

  isHTMLUListElement(node: HTMLUListElement | null): node is HTMLUListElement {
    return node !== null;
  }

  isHTMLParagraphElement(
    node: HTMLParagraphElement | null
  ): node is HTMLParagraphElement {
    return node !== null;
  }

  isHTMLSpanElement(node: HTMLSpanElement | null): node is HTMLSpanElement {
    return node !== null;
  }
}
