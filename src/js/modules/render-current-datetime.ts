import getDateTime from 'utils/datetime';
import showAlert from 'utils/show-alert';
import ElementsSelector from './elements-selector';
import TypeGuard from './type-guard';

export default function (time: string, timezone: string): void {
  const elementsSelector = new ElementsSelector();
  const typeGuard = new TypeGuard();

  const dateTimeElements = elementsSelector.getCurrentDatetimeElements();

  if (!typeGuard.isGuaranteedDateTimeElements(dateTimeElements)) {
    showAlert('Unexpected Error: Some DOM elements are missing.');
    return;
  }

  dateTimeElements.dateTimeBody.textContent = getDateTime(
    'long',
    time,
    timezone
  );
}
