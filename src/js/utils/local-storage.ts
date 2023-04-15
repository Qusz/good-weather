import { LocalStorageData } from '@/js/types';

function checkLocalStorage(): boolean {
  if (!localStorage.length) {
    return false;
  }
  return true;
}

function saveLocation(location: LocalStorageData): void {
  localStorage.setItem('city', location.city);
  localStorage.setItem('country', location.country);
  localStorage.setItem('lon', location.lon);
  localStorage.setItem('lat', location.lat);
}

function getSavedLocation(): LocalStorageData {
  const localStorageExists: boolean = checkLocalStorage();

  if (!localStorageExists) {
    throw new Error('No location saved in local storage');
  }

  const storageData: LocalStorageData = {
    city: localStorage.getItem('city')!,
    country: localStorage.getItem('country')!,
    lon: localStorage.getItem('lon')!,
    lat: localStorage.getItem('lat')!
  };

  return storageData;
}

export { checkLocalStorage, saveLocation, getSavedLocation };
