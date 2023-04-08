import { isGuaranteedRenderLocationElements } from 'utils/guaranteed-elements';
import showAlert from 'utils/show-alert';

import { getRenderLocationElements } from './elements-selector';

export default function (city: string, country: string): void {
  const elements = getRenderLocationElements();

  if (!isGuaranteedRenderLocationElements(elements)) {
    showAlert('Unexpected Error: Some DOM elements are missing.');
    return;
  }

  elements.locationBody.textContent = `${city}, ${country}`;
}
