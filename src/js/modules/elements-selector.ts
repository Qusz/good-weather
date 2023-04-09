import {
  WeatherElements,
  LocationElements,
  DateTimeElements,
  RenderLocationElements,
  ToggleForecastElemnets,
  TableElements
} from 'types/types';

function getCurrentWeatherElements(): WeatherElements {
  return {
    currentTemperature: document.querySelector('[data-current-temperature]'),
    currentWeather: document.querySelector('[data-current-weather]'),
    realFeel: document.querySelector('[data-real-feel]'),
    wind: document.querySelector('[data-wind]'),
    pressure: document.querySelector('[data-pressure]'),
    humidity: document.querySelector('[data-humidity]'),
    sunrise: document.querySelector('[data-sunrise]'),
    sunset: document.querySelector('[data-sunset]'),
    icon: document.querySelector('[data-weather-icon-sprite]')
  };
}

function getLocationElements(): LocationElements {
  return {
    searchForm: document.querySelector('[data-search]'),
    searchResultsParent: document.querySelector('[data-search-results]'),
    searchInput: document.querySelector('[data-search-input]'),
    searchResultsList: document.querySelector('[data-search-results-list]')
  };
}

function getCurrentDatetimeElements(): DateTimeElements {
  return {
    dateTimeBody: document.querySelector('.weather-card__date')
  };
}

function getRenderLocationElements(): RenderLocationElements {
  return {
    locationBody: document.querySelector('.weather-card__location')
  };
}

function getToggleForecastElements(): ToggleForecastElemnets {
  return {
    parent: document.querySelector('[data-forecast]'),
    toggle: document.querySelector('[data-forecast-header-wrapper]'),
    caption: document.querySelector('[data-forecast-caption]'),
    body: document.querySelector('[data-forecast-body]')
  };
}

function getTableElements(): TableElements {
  return {
    body: document.querySelector('[data-forecast-table-body]')
  };
}

export {
  getCurrentWeatherElements,
  getLocationElements,
  getCurrentDatetimeElements,
  getRenderLocationElements,
  getToggleForecastElements,
  getTableElements
};
