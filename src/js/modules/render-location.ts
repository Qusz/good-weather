import { isGuaranteedRenderLocationElements } from 'utils/guaranteed-elements';
import showAlert from 'utils/show-alert';

import { getRenderLocationElements } from './elements-selector';

export default function (city: string, country: string): void {
  const elements = getRenderLocationElements();

  if (isGuaranteedRenderLocationElements(elements)) {
    elements.locationBody.textContent = `${city}, ${country}`;
  } else {
    showAlert('Unexpected Error: Some DOM elements are missing.');
  }
}
