export interface ISaveCollectionRequest {
  isEditing: boolean;
  id: string;
  description: string;
  name: string;
  order: number;
  drawingsIds: string[];
}
