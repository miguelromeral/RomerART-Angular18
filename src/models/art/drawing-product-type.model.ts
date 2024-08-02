import { ICustomSelectOption } from '@models/inputs/select-option.model';
import { TranslatableModel } from '@models/translatable-model';

export class DrawingProductType
  extends TranslatableModel
  implements ICustomSelectOption
{
  id: number;
  text: string;
  emoji: string;
  value: string;
  label: string;
  labelCode: string;

  constructor(data: Partial<DrawingProductType> = {}) {
    super(data.code || '');
    this.id = data.id || -1;
    this.text = data.text || '';
    this.emoji = data.emoji || '';
    this.value = this.id.toString();
    this.label = '';
    this.labelCode = '';
    this.setLabel();
  }

  // TODO: quitar esto y que se encargue el select input
  override setTranslatedText(translated: string) {
    super.setTranslatedText(translated);
    this.setLabel();
  }

  setLabel() {
    this.label = `${this.emoji} ${this.translatedText}`;
    this.labelCode = '';
  }
}
