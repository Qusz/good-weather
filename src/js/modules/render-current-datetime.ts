import { isGuaranteedDateTimeElements } from 'utils/guaranteed-elements';
import getDateTime from 'utils/datetime';
import showAlert from 'utils/show-alert';

import { getCurrentDatetimeElements } from './elements-selector';

export default function (time: string, timezone: string): void {
  const dateTimeElements = getCurrentDatetimeElements();

  if (isGuaranteedDateTimeElements(dateTimeElements)) {
    dateTimeElements.dateTimeBody.textContent = getDateTime(
      'long',
      time,
      timezone
    );
  } else {
    showAlert('Unexpected Error: Some DOM elements are missing.');
  }
}
