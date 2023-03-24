import getTime from 'utils/datetime';
import getWeatherStatus from 'utils/weather-status';
import getWindDirection from 'utils/get-wind-direction';
import pickIcon from 'utils/pick-icon';

import type { SetNonNullable } from 'type-fest';

import { OpenmeteoResponse } from 'types/types';
import {
  isHTMLDivElement,
  isHTMLSpanElement,
  isHTMLElement
} from './htmlTypePredicates';

type Elements = {
  currentTemperature: HTMLDivElement | null;
  currentWeather: HTMLDivElement | null;
  realFeel: HTMLSpanElement | null;
  wind: HTMLSpanElement | null;
  pressure: HTMLSpanElement | null;
  humidity: HTMLSpanElement | null;
  sunrise: HTMLSpanElement | null;
  sunset: HTMLSpanElement | null;
  icon: HTMLElement | null;
};

type GuaranteedElements = SetNonNullable<Elements>;

type WeatherData = {
  [key: string]: string;
};

function isGuaranteedElements(
  elements: Elements | GuaranteedElements
): elements is GuaranteedElements {
  return (
    isHTMLDivElement(elements.currentTemperature) &&
    isHTMLDivElement(elements.currentWeather) &&
    isHTMLSpanElement(elements.realFeel) &&
    isHTMLSpanElement(elements.wind) &&
    isHTMLSpanElement(elements.pressure) &&
    isHTMLSpanElement(elements.humidity) &&
    isHTMLSpanElement(elements.sunrise) &&
    isHTMLSpanElement(elements.sunset) &&
    isHTMLElement(elements.icon)
  );
}

export default function (data: OpenmeteoResponse): void {
  const ELEMENTS: Elements = {
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

  const currentTimeSpamp: string = data.current_weather.time;
  const currentTimeStampIndex: number =
    data.hourly.time.indexOf(currentTimeSpamp);

  const baseIconPath = 'sprite.svg#icon';

  const weatherData: WeatherData = {
    weatherStatus: getWeatherStatus(data.current_weather.weathercode),
    temperature: data.hourly.temperature_2m[currentTimeStampIndex],
    realFeel: data.hourly.apparent_temperature[currentTimeStampIndex],
    windDirection: getWindDirection(data.current_weather.winddirection),
    windSpeed: data.hourly.windspeed_10m[currentTimeStampIndex],
    pressure: data.hourly.pressure_msl[currentTimeStampIndex],
    humidity: data.hourly.relativehumidity_2m[currentTimeStampIndex],
    sunrise: getTime('short', data.daily.sunrise[0]),
    sunset: getTime('short', data.daily.sunset[0])
  };

  if (isGuaranteedElements(ELEMENTS)) {
    ELEMENTS.currentTemperature.textContent = `${weatherData.temperature}°C`;
    ELEMENTS.currentWeather.textContent = `${weatherData.weatherStatus}`;
    ELEMENTS.realFeel.textContent = `${weatherData.realFeel}°C`;
    ELEMENTS.wind.textContent = `${weatherData.windDirection}, ${weatherData.windSpeed} km/h`;
    ELEMENTS.pressure.textContent = `${weatherData.pressure} hPa`;
    ELEMENTS.humidity.textContent = `${weatherData.humidity}%`;
    ELEMENTS.sunrise.textContent = `${weatherData.sunrise}`;
    ELEMENTS.sunset.textContent = `${weatherData.sunset}`;

    ELEMENTS.icon.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      `${baseIconPath}-${pickIcon(weatherData.weatherStatus)}`
    );
  }
}
