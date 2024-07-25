import { Drawing } from './drawing.model';

export class Collection {
  id: string;
  name: string;
  description: string;
  order: number;
  drawings: Drawing[];
  // drawingsReferences
  textDrawingsReferences: string;

  constructor(data: Partial<Collection> = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.order = data.order || 0;
    this.drawings = data.drawings?.map(drawing => new Drawing(drawing)) || [];
    this.textDrawingsReferences = data.textDrawingsReferences || '';
  }
}
