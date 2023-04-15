import { OpenmeteoResponse, WeatherData } from '@/js/types';

import getTime from 'utils/datetime';
import getWeatherStatus from 'utils/weather-status';
import getWindDirection from 'utils/get-wind-direction';
import pickIcon from 'utils/pick-icon';
import showAlert from 'utils/show-alert';

import TypeGuard from './type-guard';
import ElementsSelector from './elements-selector';

export default function (data: OpenmeteoResponse): void {
  const elementsSelector = new ElementsSelector();
  const typeGuard = new TypeGuard();

  const currentWeatherElements = elementsSelector.getCurrentWeatherElements();
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

  if (!typeGuard.isGuaranteedWeatherElements(currentWeatherElements)) {
    showAlert('Unexpected Error: Some DOM elements are missing.');
    return;
  }

  currentWeatherElements.currentTemperature.textContent = `${weatherData.temperature}°C`;
  currentWeatherElements.currentWeather.textContent = `${weatherData.weatherStatus}`;
  currentWeatherElements.realFeel.textContent = `${weatherData.realFeel}°C`;
  currentWeatherElements.wind.textContent = `${weatherData.windDirection}, ${weatherData.windSpeed} km/h`;
  currentWeatherElements.pressure.textContent = `${weatherData.pressure} hPa`;
  currentWeatherElements.humidity.textContent = `${weatherData.humidity}%`;
  currentWeatherElements.sunrise.textContent = `${weatherData.sunrise}`;
  currentWeatherElements.sunset.textContent = `${weatherData.sunset}`;
  currentWeatherElements.icon.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    'xlink:href',
    `${baseIconPath}-${pickIcon(weatherData.weatherStatus)}`
  );
}
