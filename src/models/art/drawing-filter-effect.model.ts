import { ICustomSelectOption } from '@models/inputs/select-option.model';
import { IDrawingFilterEffect } from 'config/data/drawing-filter-effect.config';

export class DrawingFilterEffect
  implements ICustomSelectOption, IDrawingFilterEffect
{
  id: number;
  value: string;
  label: string;
  labelCode: string;

  constructor(data: Partial<DrawingFilterEffect> = {}) {
    this.id = data.id == undefined ? -1 : data.id;
    this.value = this.id.toString();
    this.label = this.id.toString();
    this.labelCode = data.labelCode || '';
  }
}
