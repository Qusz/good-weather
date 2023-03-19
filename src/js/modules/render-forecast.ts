import getTime from 'utils/datetime';
import getWeatherStatus from 'utils/weather-status';

import { OpenmeteoResponse } from 'types/types';

export default function (data: OpenmeteoResponse): void {
  const currentHour: string = data.current_weather.time;
  const forecastPoints: number = 8;

  const table: Element | null = document.querySelector('[data-forecast-table]');

  let step: number = 0;
  let currentIndex: number | null = null;

  // Find index of current hour
  data.hourly.time.forEach((point: string, index: number) => {
    if (point === currentHour) {
      currentIndex = index;
    }
  });

  for (let i = 0; i < forecastPoints; i++) {
    step += 2;

    const newTableRow = document.createElement('tr');
    newTableRow.className = 'weather-card__forecast-table-row';
    newTableRow.innerHTML = `
      <td class="weather-card__forecast-table-col">
        ${getTime('long', data.hourly.time[currentIndex! + step])}
      </td>
      <td class="weather-card__forecast-table-col">
        ${data.hourly.temperature_2m[currentIndex! + step]}°C
      </td>
      <td class="weather-card__forecast-table-col">
        ${getWeatherStatus(data.hourly.weathercode[currentIndex! + step])}
      </td>
    `;

    table?.appendChild(newTableRow);
  }
}