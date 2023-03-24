import debounce from 'lodash.debounce';

import { LocalStorageData } from 'types/types';

import clearHTML from 'utils/clear-html';
import showAlert from 'utils/show-alert';
import { saveLocation } from 'utils/local-storage';
import openmeteo from '../APIs/openmeteo';
import worldtime from '../APIs/worldtime';
import nominatim from '../APIs/nominatim';

import renderCurrentWeather from './render-current-weather';
import renderForecast from './render-forecast';
import renderLocation from './render-location';
import renderCurrentDatetime from './render-current-datetime';
import { SetNonNullable } from 'type-fest';
import { isHTMLDivElement, isHTMLElement, isHTMLFormElement, isHTMLInputElement, isHTMLUListElement } from './htmlTypePredicates';

type Elements = {
    searchForm: HTMLFormElement | null;
    searchResultsParent: HTMLDivElement | null;
    searchInput: HTMLInputElement | null;
    searchResultsList: HTMLUListElement | null;
    tableBody: HTMLElement | null;
};

type GuaranteedElements = SetNonNullable<Elements>;

/*
 * Here we can compose a type predicate out of simple type predicates.
 */
function isGuaranteedElements(elements: Elements | GuaranteedElements): elements is GuaranteedElements {
    return isHTMLFormElement(elements.searchForm) &&
        isHTMLDivElement(elements.searchResultsParent) &&
        isHTMLInputElement(elements.searchInput) &&
        isHTMLUListElement(elements.searchResultsList) &&
        isHTMLElement(elements.tableBody);
}

export default function (): void {
  const searchForm: HTMLFormElement | null =
    document.querySelector('[data-search]');

  const searchResultsParent: HTMLDivElement | null = document.querySelector(
    '[data-search-results]'
  );

  const searchInput: HTMLInputElement | null = document.querySelector(
    '[data-search-input]'
  );

  const searchResultsList: HTMLUListElement | null = document.querySelector(
    '[data-search-results-list]'
  );

  const tableBody: HTMLElement | null = document.querySelector(
    '[data-forecast-table-body]'
  );

  /*
   * Here we collect all of the elements into a single object.
   * The program doesn't require us to do that but it means we can make a single check for missing elements.
   */
  const elements: Elements = { searchForm, searchResultsParent, searchInput, searchResultsList, tableBody };

  if (isGuaranteedElements(elements)) {
    /*
     * Now we know that none of our elements are null.
     * If we refer to the properties of `elements` then TypeScript will not complain.
     * If we made the mistake of referring to, for example, `searchForm` then TypeScript would still complain and
     * we would need to do various untidy things like `!`, `?`, `as` and so on.
     */

    // Using lodash debounce to avoid spamming the API with requests
    const handleSearch = debounce(() => {
      const query: string | undefined = elements.searchInput.value;

      if (query) {
        nominatim(query)
          .then((data) => {
            clearHTML(elements.searchResultsList);
            elements.searchResultsParent.style.display = 'block';

            data.forEach((item) => {
              /*
                The location name property in item.address object can have different names depending on location's type. So it's accessed via index rather than property name
              */
              const itemKeys: string[] = Object.keys(item.address);

              const li = document.createElement('li') as HTMLLIElement;
              li.className = 'searchbar__results-item';
              li.innerHTML = `${item.display_name}`;
              li.setAttribute('data-place-name', item.address[itemKeys[0]]);
              li.setAttribute('data-place-country', item.address.country);
              li.setAttribute('data-place-lon', item.lon);
              li.setAttribute('data-place-lat', item.lat);

              elements.searchResultsList.appendChild(li);
            });

            elements.searchResultsParent.style.display = 'block';
          })
          .catch((error) => {
            clearHTML(elements.searchResultsList);

            const message = document.createElement('li') as HTMLLIElement;
            message.className = 'searchbar__results-message';
            message.textContent = error.message;
            elements.searchResultsList.appendChild(message);
          });

        // Abort search if query is empty
      } else if (!query) {
        elements.searchResultsParent.style.display = 'none';
      }
    }, 300);

    /*
     * Events
     */
    elements.searchInput.addEventListener('keyup', handleSearch);

    // Choose location
    elements.searchResultsList.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.classList.contains('searchbar__results-item')) return;

      // Close search menu when location is chosen
      clearHTML(elements.searchResultsList);
      elements.searchResultsParent.style.display = 'none';

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
          renderForecast(elements.tableBody, data);
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
        !elements.searchForm.contains(e.target as HTMLElement) &&
        elements.searchResultsParent.style.display !== 'none'
      ) {
        clearHTML(elements.searchResultsList);
        elements.searchResultsParent.style.display = 'none';
      }
    });

    elements.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });

  } else {
    // TODO: handle error properly.
    window.alert('Unexpected Error: Some elements are missing.');
  }
}
