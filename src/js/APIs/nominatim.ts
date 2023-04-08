import { NominatimResponse } from 'types/types';

export default async function (query: string): Promise<NominatimResponse[]> {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('city', query);
  url.searchParams.set('format', 'json');
  url.searchParams.set('addressdetails', '1');
  url.searchParams.set('accept-language', 'en-US');

  try {
    const request = await fetch(url);
    const response: NominatimResponse[] = await request.json();

    if (!response.length) {
      throw new Error('Nothing found ...');
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw error;
  }
}
