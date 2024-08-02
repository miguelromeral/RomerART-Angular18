import { ICustomSelectOption } from '@models/inputs/select-option.model';

export class DrawingProductType implements ICustomSelectOption {
  id: number;
  text: string;
  emoji: string;
  value: string;
  label: string;
  labelCode: string;

  constructor(data: Partial<DrawingProductType> = {}) {
    this.id = data.id || -1;
    this.text = data.text || '';
    this.emoji = data.emoji || '';
    this.value = this.id.toString();
    this.label = data.label || '';
    this.labelCode = data.labelCode || '';
  }
}
