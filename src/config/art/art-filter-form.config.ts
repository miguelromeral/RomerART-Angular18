import { ICustomSelectOption } from '@models/inputs/select-option.model';

export class ArtFilterFormConfig {
  static queryParamsNames = {
    sortBy: 'sort',
    textQuery: 'query',
    type: 'type',
    productType: 'product_type',
    product: 'product',
    collection: 'collection',
    character: 'character',
    modelName: 'model',
    software: 'software',
    paper: 'paper',
    spotify: 'spotify',
    favorites: 'favorites',
  };

  static pagination = {
    resultsPerPage: 0,
    firstPage: 0,
  };
}

export interface IArtFilterValuesSortBy extends ICustomSelectOption {
  value: string;
  visible: boolean;
  class?: string | undefined;
}

export const artFilterValuesSortBy: IArtFilterValuesSortBy[] = [
  {
    value: 'date-desc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.DATE-DESC',
    label: '',
    visible: true,
  },
  {
    value: 'date-asc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.DATE-ASC',
    label: '',
    visible: true,
  },
  {
    value: 'name-asc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.NAME-ASC',
    label: '',
    visible: true,
  },
  {
    value: 'name-desc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.NAME-DESC',
    label: '',
    visible: true,
  },
  {
    value: 'time-asc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.TIME-ASC',
    label: '',
    visible: true,
  },
  {
    value: 'time-desc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.TIME-DESC',
    label: '',
    visible: true,
  },
  {
    value: 'kudos-desc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.KUDOS-DESC',
    class: 'kudos',
    label: '',
    visible: true,
  },
  {
    value: 'kudos-asc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.KUDOS-ASC',
    class: 'kudos',
    label: '',
    visible: true,
  },
  {
    value: 'views-desc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.VIEWS-DESC',
    class: 'views',
    label: '',
    visible: true,
  },
  {
    value: 'views-asc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.VIEWS-ASC',
    class: 'views',
    label: '',
    visible: true,
  },
  {
    value: 'scorem-desc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.SCOREM-DESC',
    class: 'mr-score-miguel',
    label: '',
    visible: true,
  },
  {
    value: 'scorem-asc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.SCOREM-ASC',
    class: 'mr-score-miguel',
    label: '',
    visible: true,
  },
  {
    value: 'scoreu-desc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.SCOREU-DESC',
    class: 'mr-score-popular',
    label: '',
    visible: true,
  },
  {
    value: 'scoreu-asc',
    labelCode: 'SCREENS.DRAWING-SEARCH.FORM.SORTBY.SCOREU-ASC',
    class: 'mr-score-popular',
    label: '',
    visible: true,
  },
];
