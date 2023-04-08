import getTime from 'utils/datetime';
import getWeatherStatus from 'utils/weather-status';
import clearHtml from 'utils/clear-html';

import { OpenmeteoResponse } from 'types/types';

export default function (
  tableBody: HTMLElement,
  data: OpenmeteoResponse
): void {
  const currentHour: string = data.current_weather.time;
  const forecastPoints = 8;
  const step = 2;

  let currnetPoint = 0;
  let currentIndex: number | null = null;

  // Find index of current hour
  data.hourly.time.forEach((point: string, index: number) => {
    if (point === currentHour) {
      currentIndex = index;
    }
  });

  // Clear previous data if any
  if (tableBody.innerHTML) {
    clearHtml(tableBody);
  }

  for (let i = 0; i < forecastPoints; i++) {
    currnetPoint += step;

    const newTableRow = document.createElement('tr') as HTMLTableRowElement;
    newTableRow.className = 'weather-card__forecast-table-row';
    newTableRow.innerHTML = `
      <td class="weather-card__forecast-table-col">
        ${getTime('short', data.hourly.time[currentIndex! + currnetPoint])}
      </td>
      <td class="weather-card__forecast-table-col">
        ${data.hourly.temperature_2m[currentIndex! + currnetPoint]}°C
      </td>
      <td class="weather-card__forecast-table-col">
        ${getWeatherStatus(
          data.hourly.weathercode[currentIndex! + currnetPoint]
        )}
      </td>
    `;

    tableBody.appendChild(newTableRow);
  }
}
