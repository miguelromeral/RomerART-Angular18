import { environment } from 'environments/environment';

export class DrawingFilter {
  sortBy: string | null;
  textQuery: string | null;
  type: number | null;
  productType: number | null;
  productName: string | null;
  collection: string | null;
  characterName: string | null;
  modelName: string | null;
  software: number | null;
  paper: number | null;
  formSpotify: string | null;
  spotify: boolean | null;
  formFavorites: boolean | null;
  favorites: boolean;
  pageSize: number | null;
  pageNumber: number | null;

  constructor(data: Partial<DrawingFilter> = {}) {
    this.sortBy = data.sortBy || environment.forms.drawingFilter.default.sortBy;
    this.textQuery =
      data.textQuery || environment.forms.drawingFilter.default.textQuery;
    this.type = data.type || environment.forms.drawingFilter.default.type;
    this.productType =
      data.productType || environment.forms.drawingFilter.default.productType;
    this.productName =
      data.productName || environment.forms.drawingFilter.default.productName;
    this.collection =
      data.collection || environment.forms.drawingFilter.default.collection;
    this.characterName =
      data.characterName ||
      environment.forms.drawingFilter.default.characterName;
    this.modelName =
      data.modelName || environment.forms.drawingFilter.default.modelName;
    this.software =
      data.software || environment.forms.drawingFilter.default.software;
    this.paper = data.paper || environment.forms.drawingFilter.default.paper;
    this.formSpotify = data.formSpotify || null;
    if (this.formSpotify && this.formSpotify !== 'null') {
      this.spotify =
        (this.formSpotify ??
          environment.forms.drawingFilter.default.spotify) === 'true';
    } else {
      this.spotify = null;
    }
    this.formFavorites = data.formFavorites || null;
    this.favorites = (data.formFavorites || null) === true;
    this.pageNumber = data.pageNumber || 0;
    this.pageSize = data.pageSize || 0;
  }
}
