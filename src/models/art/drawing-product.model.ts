import { ICustomSelectOption } from '@models/inputs/select-option.model';
import { getEmojiFromProductType } from '@utils/customization/emoji-utils';

export class DrawingProduct implements ICustomSelectOption {
  productName: string;
  productTypeId: number;
  productType: string;
  value: string;
  label: string;
  labelCode: string;
  emoji: string;

  constructor(data: Partial<DrawingProduct> = {}) {
    this.productName = data.productName || '';
    this.productTypeId = data.productTypeId || -1;
    this.productType = data.productType || '';
    this.value = this.productName;
    this.emoji = getEmojiFromProductType(this.productTypeId);
    this.label = `${this.productName}`;
    this.labelCode = '';
  }
}
