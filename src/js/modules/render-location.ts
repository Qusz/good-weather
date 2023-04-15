import showAlert from 'utils/show-alert';
import ElementsSelector from './elements-selector';
import TypeGuard from './type-guard';

export default function (city: string, country: string): void {
  const elementsSelector = new ElementsSelector();
  const typeGuard = new TypeGuard();

  const elements = elementsSelector.getRenderLocationElements();

  if (!typeGuard.isGuaranteedRenderLocationElements(elements)) {
    showAlert('Unexpected Error: Some DOM elements are missing.');
    return;
  }

  elements.locationBody.textContent = `${city}, ${country}`;
}
