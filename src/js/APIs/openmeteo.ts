import { OpenmeteoResponse } from 'types/types';

export default async function (
  lat: string,
  lng: string
): Promise<OpenmeteoResponse> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', lat.toString());
  url.searchParams.set('longitude', lng.toString());
  url.searchParams.set(
    'hourly',
    'temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,pressure_msl,windspeed_10m'
  );
  url.searchParams.set('daily', 'weathercode,sunrise,sunset');
  url.searchParams.set('current_weather', 'true');
  url.searchParams.set('timezone', 'auto');

  try {
    const request = await fetch(url);

    const response: OpenmeteoResponse = await request.json();

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Something went wrong... Please try again later.');
    }

    throw error;
  }
}
