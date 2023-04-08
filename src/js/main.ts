import 'normalize.css';
import 'toastify-js/src/toastify.css';
import '@/scss/style.scss';

import showForecast from './modules/toggle-forecast';
import search from './modules/location-search';
import loadContent from './modules/load-content';

(() => {
  window.addEventListener('DOMContentLoaded', () => {
    showForecast();
    loadContent();
    search();
  });
})();
