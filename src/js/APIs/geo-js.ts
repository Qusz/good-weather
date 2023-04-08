import { GeoJSResponse } from 'types/types';

export default async function (): Promise<GeoJSResponse> {
  const url = `https://get.geojs.io/v1/ip/geo.json`;

  try {
    const request = await fetch(url);
    const response: GeoJSResponse = await request.json();
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Cannot get your IP address: ${error.message}. Please select location manually.`
      );
    }
    throw error;
  }
}
