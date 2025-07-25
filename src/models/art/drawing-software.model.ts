import { ICustomSelectOption } from '@models/inputs/select-option.model';

export class DrawingSoftware implements ICustomSelectOption {
  id: number;
  name: string;
  value: string;
  label: string;
  labelCode: string;

  constructor(data: Partial<DrawingSoftware> = {}) {
    this.id = data.id == undefined ? -1 : data.id;
    this.name = data.name || '';
    this.value = this.id.toString();
    this.label = this.name;
    this.labelCode = '';
  }
}
