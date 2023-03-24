import { checkLocalStorage, getSavedLocation } from 'utils/local-storage';
import showAlert from 'utils/show-alert';

import getLocation from '../APIs/geo-js';
import openmeteo from '../APIs/openmeteo';
import worldtime from '../APIs/worldtime';

import renderCurrentWeather from './render-current-weather';
import renderForecast from './render-forecast';
import renderLocation from './render-location';
import renderCurrentDatetime from './render-current-datetime';
import { isHTMLElement } from './htmlTypePredicates';

export default function (): void {
  document.addEventListener('DOMContentLoaded', () => {
    const localStorageExists = checkLocalStorage();
    const tableBody: HTMLElement | null = document.querySelector(
      '[data-forecast-table-body]'
    );

    if (isHTMLElement(tableBody)) {
      if (localStorageExists) {
        const location = getSavedLocation();

        renderLocation(location.city, location.country);

        openmeteo(location.lat, location.lon)
          .then((data) => {
            renderCurrentWeather(data);
            return data;
          })
          .then((data) => {
            renderForecast(tableBody, data);
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
      } else {
        getLocation()
          .then((location) => {
            renderLocation(location.city, location.country);
            return openmeteo(location.latitude, location.longitude);
          })
          .then((weatherData) => {
            renderCurrentWeather(weatherData);
            return weatherData;
          })
          .then((weatherData) => {
            renderForecast(tableBody, weatherData);
            return weatherData;
          })
          .then((weatherData) => {
            return worldtime(weatherData.timezone);
          })
          .then((timeData) => {
            renderCurrentDatetime(timeData.datetime, timeData.timezone);
          })
          .catch((error) => {
            showAlert(error.message);
          });
      }
    } else {
      showAlert('Unexpected Error: Some DOM elements are missing.');
    }
  });
}
