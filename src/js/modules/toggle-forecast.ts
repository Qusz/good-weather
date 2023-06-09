import showAlert from 'utils/show-alert';
import TypeGuard from './type-guard';
import ElementsSelector from './elements-selector';

export default function (): void {
  const elementsSelector = new ElementsSelector();
  const typeGuard = new TypeGuard();

  const elements = elementsSelector.getToggleForecastElements();

  const activeClass = 'weather-card__forecast--active';
  const defaultCaption = 'Show forecast';
  const activeCaption = 'Hide forecast';

  if (!typeGuard.isGuaranteedToggleForecastElements(elements)) {
    showAlert('Unexpected Error: Some DOM elements are missing.');
    return;
  }

  elements.toggle.addEventListener('click', () => {
    elements.parent.classList.toggle(activeClass);

    if (elements.body.style.maxHeight) {
      elements.body.style.maxHeight = '';
      elements.caption.textContent = defaultCaption;
    } else {
      elements.body.style.maxHeight = `${elements.body!.scrollHeight}px`;
      elements.caption.textContent = activeCaption;
    }
  });
}
