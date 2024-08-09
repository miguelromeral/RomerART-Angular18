import { ICustomSelectOption } from '@models/inputs/select-option.model';
import { Drawing } from './drawing.model';

export class Collection implements ICustomSelectOption {
  id: string;
  name: string;
  description: string;
  order: number;
  drawings: Drawing[];
  drawingsId: string[];
  // drawingsReferences
  textDrawingsReferences: string;
  value: string;
  label: string;
  labelCode: string;

  constructor(data: Partial<Collection> = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.order = data.order || 0;
    this.drawings = data.drawings?.map(drawing => new Drawing(drawing)) || [];
    this.drawingsId = data.drawingsId || [];
    this.textDrawingsReferences = data.textDrawingsReferences || '';
    this.value = this.id;
    this.label = this.name;
    this.labelCode = '';
  }
}
