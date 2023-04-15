import {
  WeatherElements,
  GuaranteedElements,
  LocationElements,
  DateTimeElements,
  RenderLocationElements,
  ToggleForecastElements,
  TableElements
} from '@/js/types';

import TypePredicates from './html-type-predicates';

export default class TypeGuard {
  typePredicates: TypePredicates;

  constructor() {
    this.typePredicates = new TypePredicates();
  }

  isGuaranteedWeatherElements(
    elements: WeatherElements | GuaranteedElements<WeatherElements>
  ): elements is GuaranteedElements<WeatherElements> {
    return (
      this.typePredicates.isHTMLDivElement(elements.currentTemperature) &&
      this.typePredicates.isHTMLDivElement(elements.currentWeather) &&
      this.typePredicates.isHTMLSpanElement(elements.realFeel) &&
      this.typePredicates.isHTMLSpanElement(elements.wind) &&
      this.typePredicates.isHTMLSpanElement(elements.pressure) &&
      this.typePredicates.isHTMLSpanElement(elements.humidity) &&
      this.typePredicates.isHTMLSpanElement(elements.sunrise) &&
      this.typePredicates.isHTMLSpanElement(elements.sunset) &&
      this.typePredicates.isHTMLElement(elements.icon)
    );
  }

  isGuaranteedLocationElements(
    elements: LocationElements | GuaranteedElements<LocationElements>
  ): elements is GuaranteedElements<LocationElements> {
    return (
      this.typePredicates.isHTMLFormElement(elements.searchForm) &&
      this.typePredicates.isHTMLDivElement(elements.searchResultsParent) &&
      this.typePredicates.isHTMLInputElement(elements.searchInput) &&
      this.typePredicates.isHTMLUListElement(elements.searchResultsList)
    );
  }

  isGuaranteedDateTimeElements(
    elements: DateTimeElements | GuaranteedElements<DateTimeElements>
  ): elements is GuaranteedElements<DateTimeElements> {
    return this.typePredicates.isHTMLParagraphElement(elements.dateTimeBody);
  }

  isGuaranteedRenderLocationElements(
    elements:
      | RenderLocationElements
      | GuaranteedElements<RenderLocationElements>
  ): elements is GuaranteedElements<RenderLocationElements> {
    return this.typePredicates.isHTMLParagraphElement(elements.locationBody);
  }

  isGuaranteedToggleForecastElements(
    elements:
      | ToggleForecastElements
      | GuaranteedElements<ToggleForecastElements>
  ): elements is GuaranteedElements<ToggleForecastElements> {
    return (
      this.typePredicates.isHTMLDivElement(elements.parent) &&
      this.typePredicates.isHTMLDivElement(elements.toggle) &&
      this.typePredicates.isHTMLSpanElement(elements.caption) &&
      this.typePredicates.isHTMLDivElement(elements.body)
    );
  }

  isGuaranteedTableElements(
    elements: TableElements | GuaranteedElements<TableElements>
  ): elements is GuaranteedElements<TableElements> {
    return this.typePredicates.isHTMLElement(elements.body);
  }
}
