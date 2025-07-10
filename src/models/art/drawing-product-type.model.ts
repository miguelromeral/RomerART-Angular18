import { ICustomSelectOption } from '@models/inputs/select-option.model';
import { getEmojiFromProductType } from '@utils/customization/emoji-utils';
import { DrawingProductTypes } from './enums/drawing-product-types.enum';

export class DrawingProductType implements ICustomSelectOption {
  id: number;
  productName: string;
  productTypeId: number;
  productType: DrawingProductTypes;
  text: string;
  emoji: string;
  value: string;
  label: string;
  labelCode: string;

  constructor(data: Partial<DrawingProductType> = {}) {
    this.productName = data.productName || '';
    this.productTypeId = data.productTypeId || DrawingProductTypes.NotSpecified;
    this.productType = this.productTypeId;
    this.id = data.id || -1;
    this.text = data.text || '';
    this.emoji = getEmojiFromProductType(this.id);
    this.value = this.id.toString();
    this.label = data.label || '';
    this.labelCode = data.labelCode || '';
  }
}
