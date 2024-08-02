import { ICustomSelectOption } from '@models/inputs/select-option.model';
import { getEmojiFromProductType } from '@utils/customization/emoji-utils';

export class DrawingCharacter implements ICustomSelectOption {
  characterName: string;
  productTypeId: number;
  productType: string;
  value: string;
  label: string;
  labelCode: string;

  constructor(data: Partial<DrawingCharacter> = {}) {
    this.characterName = data.characterName || '';
    this.productTypeId = data.productTypeId || -1;
    this.productType = data.productType || '';
    this.value = this.characterName;
    this.label = `${getEmojiFromProductType(this.productTypeId)} ${this.characterName}`;
    this.labelCode = '';
  }
}
