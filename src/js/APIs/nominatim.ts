import { NominatimResponse } from 'types/types';

export default async function (
  query: string
): Promise<NominatimResponse[] | null> {
  const url: URL = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('city', query);
  url.searchParams.set('format', 'json');
  url.searchParams.set('addressdetails', '1');
  url.searchParams.set('accept-languag', 'en-US');

  try {
    const request: Response = await fetch(url);
    const response: NominatimResponse[] = await request.json();

    if (!response.length) {
      throw new Error("Can't find this location. Please try again.");
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    return null;
  }
}
