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
