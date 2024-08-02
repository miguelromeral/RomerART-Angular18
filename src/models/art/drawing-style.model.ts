import { ICustomSelectOption } from '@models/inputs/select-option.model';
import { TranslatableModel } from '@models/translatable-model';

export class DrawingStyle
  extends TranslatableModel
  implements ICustomSelectOption
{
  id: number;
  text: string;
  value: string;
  label: string;
  labelCode: string;

  constructor(data: Partial<DrawingStyle> = {}) {
    super(data.code || '');
    this.id = data.id || -1;
    this.text = data.text || '';
    this.value = this.id.toString();
    this.label = this.text;
    this.labelCode = '';
  }
}
