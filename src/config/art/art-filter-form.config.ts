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

export interface IArtFilterValuesSortBy {
  value: string;
  visible: boolean;
  class?: string | undefined;
  textCode: string;
}

export const artFilterValuesSortBy: IArtFilterValuesSortBy[] = [
  {
    value: 'date-desc',
    textCode: 'SORTBY.DATE-DESC',
    visible: true,
  },
  {
    value: 'date-asc',
    textCode: 'SORTBY.DATE-ASC',
    visible: true,
  },
  {
    value: 'name-asc',
    textCode: 'SORTBY.NAME-ASC',
    visible: true,
  },
  {
    value: 'name-desc',
    textCode: 'SORTBY.NAME-DESC',
    visible: true,
  },
  {
    value: 'time-asc',
    textCode: 'SORTBY.TIME-ASC',
    visible: true,
  },
  {
    value: 'time-desc',
    textCode: 'SORTBY.TIME-DESC',
    visible: true,
  },
  {
    value: 'kudos-desc',
    textCode: 'SORTBY.KUDOS-DESC',
    class: 'kudos',
    visible: true,
  },
  {
    value: 'kudos-asc',
    textCode: 'SORTBY.KUDOS-ASC',
    class: 'kudos',
    visible: true,
  },
  {
    value: 'views-desc',
    textCode: 'SORTBY.VIEWS-DESC',
    class: 'views',
    visible: true,
  },
  {
    value: 'views-asc',
    textCode: 'SORTBY.VIEWS-ASC',
    class: 'views',
    visible: true,
  },
  {
    value: 'scorem-desc',
    textCode: 'SORTBY.SCOREM-DESC',
    class: 'mr-score-miguel',
    visible: true,
  },
  {
    value: 'scorem-asc',
    textCode: 'SORTBY.SCOREM-ASC',
    class: 'mr-score-miguel',
    visible: true,
  },
  {
    value: 'scoreu-desc',
    textCode: 'SORTBY.SCOREU-DESC',
    class: 'mr-score-popular',
    visible: true,
  },
  {
    value: 'scoreu-asc',
    textCode: 'SORTBY.SCOREU-ASC',
    class: 'mr-score-popular',
    visible: true,
  },
];
