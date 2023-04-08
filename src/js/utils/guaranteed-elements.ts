import {
  WeatherElements,
  GuaranteedElements,
  LocationElements,
  DateTimeElements,
  RenderLocationElements,
  ToggleForecastElemnets,
  TableElements
} from 'types/types';

import {
  isHTMLDivElement,
  isHTMLSpanElement,
  isHTMLElement,
  isHTMLFormElement,
  isHTMLInputElement,
  isHTMLUListElement,
  isHTMLParagraphElement
} from '../modules/html-type-predicates';

function isGuaranteedWeatherElements(
  elements: WeatherElements | GuaranteedElements<WeatherElements>
): elements is GuaranteedElements<WeatherElements> {
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

function isGuaranteedLocationElements(
  elements: LocationElements | GuaranteedElements<LocationElements>
): elements is GuaranteedElements<LocationElements> {
  return (
    isHTMLFormElement(elements.searchForm) &&
    isHTMLDivElement(elements.searchResultsParent) &&
    isHTMLInputElement(elements.searchInput) &&
    isHTMLUListElement(elements.searchResultsList)
  );
}

function isGuaranteedDateTimeElements(
  elements: DateTimeElements | GuaranteedElements<DateTimeElements>
): elements is GuaranteedElements<DateTimeElements> {
  return isHTMLParagraphElement(elements.dateTimeBody);
}

function isGuaranteedRenderLocationElements(
  elements: RenderLocationElements | GuaranteedElements<RenderLocationElements>
): elements is GuaranteedElements<RenderLocationElements> {
  return isHTMLParagraphElement(elements.locationBody);
}

function isGuaranteedToggleForecastElements(
  elements: ToggleForecastElemnets | GuaranteedElements<ToggleForecastElemnets>
): elements is GuaranteedElements<ToggleForecastElemnets> {
  return (
    isHTMLDivElement(elements.parent) &&
    isHTMLDivElement(elements.toggle) &&
    isHTMLSpanElement(elements.caption) &&
    isHTMLDivElement(elements.body)
  );
}

function isGuaranteedTableElements(
  elements: TableElements | GuaranteedElements<TableElements>
): elements is GuaranteedElements<TableElements> {
  return isHTMLElement(elements.body);
}

export {
  isGuaranteedWeatherElements,
  isGuaranteedLocationElements,
  isGuaranteedDateTimeElements,
  isGuaranteedRenderLocationElements,
  isGuaranteedToggleForecastElements,
  isGuaranteedTableElements
};
