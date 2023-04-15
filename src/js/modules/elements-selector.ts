import {
  WeatherElements,
  LocationElements,
  DateTimeElements,
  RenderLocationElements,
  ToggleForecastElements,
  TableElements
} from '@/js/types';

export default class ElementsSelector {
  getCurrentWeatherElements(): WeatherElements {
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

  getLocationElements(): LocationElements {
    return {
      searchForm: document.querySelector('[data-search]'),
      searchResultsParent: document.querySelector('[data-search-results]'),
      searchInput: document.querySelector('[data-search-input]'),
      searchResultsList: document.querySelector('[data-search-results-list]')
    };
  }

  getCurrentDatetimeElements(): DateTimeElements {
    return {
      dateTimeBody: document.querySelector('.weather-card__date')
    };
  }

  getRenderLocationElements(): RenderLocationElements {
    return {
      locationBody: document.querySelector('.weather-card__location')
    };
  }

  getToggleForecastElements(): ToggleForecastElements {
    return {
      parent: document.querySelector('[data-forecast]'),
      toggle: document.querySelector('[data-forecast-header-wrapper]'),
      caption: document.querySelector('[data-forecast-caption]'),
      body: document.querySelector('[data-forecast-body]')
    };
  }

  getTableElements(): TableElements {
    return {
      body: document.querySelector('[data-forecast-table-body]')
    };
  }
}
