import debounce from 'lodash.debounce';

import { LocalStorageData } from '@/js/types';

import clearHTML from 'utils/clear-html';
import showAlert from 'utils/show-alert';
import { saveLocation } from 'utils/local-storage';

import TypeGuard from '@/js/modules/type-guard';

import openmeteo from '../APIs/openmeteo';
import worldtime from '../APIs/worldtime';
import nominatim from '../APIs/nominatim';

import renderCurrentWeather from './render-current-weather';
import renderForecast from './render-forecast';
import renderLocation from './render-location';
import renderCurrentDatetime from './render-current-datetime';

import ElementsSelector from './elements-selector';

export default function (): void {
  const elementsSelector = new ElementsSelector();
  const typeGuard = new TypeGuard();

  const locationElements = elementsSelector.getLocationElements();
  const tableElements = elementsSelector.getTableElements();

  if (
    !typeGuard.isGuaranteedLocationElements(locationElements) ||
    !typeGuard.isGuaranteedTableElements(tableElements)
  ) {
    showAlert('Unexpected Error: Some DOM elements are missing.');
    return;
  }

  // Using lodash debounce to avoid spamming the API with requests
  const handleSearch = debounce(() => {
    const query = locationElements.searchInput.value;

    if (query) {
      nominatim(query)
        .then((data) => {
          clearHTML(locationElements.searchResultsList);
          locationElements.searchResultsParent.style.display = 'block';

          data.forEach((item) => {
            /*
              The location name property in item.address object can have different names depending on location's type. So it's accessed via index rather than property name
            */
            const itemKeys = Object.keys(item.address);

            const li = document.createElement('li') as HTMLLIElement;
            li.className = 'searchbar__results-item';
            li.innerHTML = `${item.display_name}`;
            li.setAttribute('data-place-name', item.address[itemKeys[0]]);
            li.setAttribute('data-place-country', item.address.country);
            li.setAttribute('data-place-lon', item.lon);
            li.setAttribute('data-place-lat', item.lat);

            locationElements.searchResultsList.appendChild(li);
          });

          locationElements.searchResultsParent.style.display = 'block';
        })
        .catch((error) => {
          clearHTML(locationElements.searchResultsList);

          const message = document.createElement('li') as HTMLLIElement;
          message.className = 'searchbar__results-message';
          message.textContent = error.message;
          locationElements.searchResultsList.appendChild(message);
        });

      // Abort search if query is empty
    } else {
      locationElements.searchResultsParent.style.display = 'none';
    }
  }, 300);

  /* **************
   * Events
   **************** */
  locationElements.searchInput.addEventListener('keyup', handleSearch);

  // Choose location
  locationElements.searchResultsList.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('searchbar__results-item')) return;

    // Close search menu when location is chosen
    clearHTML(locationElements.searchResultsList);
    locationElements.searchResultsParent.style.display = 'none';

    const location: LocalStorageData = {
      city: target.getAttribute('data-place-name')!,
      country: target.getAttribute('data-place-country')!,
      lon: target.getAttribute('data-place-lon')!,
      lat: target.getAttribute('data-place-lat')!
    };

    saveLocation(location);

    renderLocation(location.city, location.country);

    openmeteo(location.lat, location.lon)
      .then((data) => {
        renderCurrentWeather(data);
        return data;
      })
      .then((data) => {
        renderForecast(tableElements.body, data);
        return data;
      })
      .then((data) => {
        return worldtime(data.timezone);
      })
      .then((data) => {
        renderCurrentDatetime(data.datetime, data.timezone);
      })
      .catch((error) => {
        showAlert(error.message);
      });
  });

  // Close search result when clicked anywhere
  document.addEventListener('click', (e: Event) => {
    if (
      e.target &&
      !locationElements.searchForm.contains(e.target as Node) &&
      locationElements.searchResultsParent.style.display !== 'none'
    ) {
      clearHTML(locationElements.searchResultsList);
      locationElements.searchResultsParent.style.display = 'none';
    }
  });

  locationElements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}
