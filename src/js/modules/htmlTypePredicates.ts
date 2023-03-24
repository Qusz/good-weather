function isHTMLElement(node: HTMLElement | null): node is HTMLElement {
  return node !== null;
}

function isHTMLFormElement(
  node: HTMLFormElement | null
): node is HTMLFormElement {
  return node !== null;
}

function isHTMLDivElement(node: HTMLDivElement | null): node is HTMLDivElement {
  return node !== null;
}

function isHTMLInputElement(
  node: HTMLInputElement | null
): node is HTMLInputElement {
  return node !== null;
}

function isHTMLUListElement(
  node: HTMLUListElement | null
): node is HTMLUListElement {
  return node !== null;
}

export {
  isHTMLElement,
  isHTMLFormElement,
  isHTMLDivElement,
  isHTMLInputElement,
  isHTMLUListElement
};
