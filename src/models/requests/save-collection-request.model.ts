export interface ISaveCollectionRequest {
  id: string;
  description: string;
  name: string;
  order: number;
  drawingIds: string[];
}
