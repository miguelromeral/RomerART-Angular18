import { Drawing } from '@models/art/drawing.model';

export class FilterResultsDrawing {
  totalDrawings: Drawing[] = [];
  filteredDrawings: Drawing[];
  fetchedCount: number;
  totalCount: number;
  totalTime: number;
  moreToFetch: boolean;

  filteredDrawingCharacters: string[];
  nDrawingCharacters: number;
  filteredDrawingModels: string[];
  nDrawingModels: number;
  filteredDrawingStyles: number[];
  nDrawingTypes: number;
  filteredDrawingProductTypes: number[];
  nDrawingProductTypes: number;
  filteredDrawingProducts: string[];
  nDrawingProducts: number;
  filteredDrawingSoftwares: number[];
  nDrawingSoftwares: number;
  filteredDrawingPapers: number[];
  nDrawingPapers: number;
  nDrawingFavorites: number;
  filteredCollections: string[];
  nDrawingCollections: number;

  constructor(data: Partial<FilterResultsDrawing> = {}) {
    const list: Drawing[] = [];
    data.filteredDrawings?.forEach(d => {
      list.push(new Drawing(d));
    });
    this.filteredDrawings = list;
    this.fetchedCount = data.fetchedCount || 0;
    this.totalCount = data.totalCount || 0;
    this.totalTime = data.totalTime || 0;
    this.moreToFetch = data.moreToFetch || false;
    this.filteredDrawingCharacters = data.filteredDrawingCharacters || [];
    this.nDrawingCharacters = data.nDrawingCharacters || 0;
    this.filteredDrawingModels = data.filteredDrawingModels || [];
    this.nDrawingModels = data.nDrawingModels || 0;
    this.filteredDrawingStyles = data.filteredDrawingStyles || [];
    this.nDrawingTypes = data.nDrawingTypes || 0;
    this.filteredDrawingProductTypes = data.filteredDrawingProductTypes || [];
    this.nDrawingProductTypes = data.nDrawingProductTypes || 0;
    this.filteredDrawingProducts = data.filteredDrawingProducts || [];
    this.nDrawingProducts = data.nDrawingProducts || 0;
    this.filteredDrawingSoftwares = data.filteredDrawingSoftwares || [];
    this.nDrawingSoftwares = data.nDrawingSoftwares || 0;
    this.filteredDrawingPapers = data.filteredDrawingPapers || [];
    this.nDrawingPapers = data.nDrawingPapers || 0;
    this.nDrawingFavorites = data.nDrawingFavorites || 0;
    this.filteredCollections = data.filteredCollections || [];
    this.nDrawingCollections = data.nDrawingCollections || 0;
  }
}
