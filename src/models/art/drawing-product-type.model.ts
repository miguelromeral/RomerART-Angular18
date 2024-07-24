import { TranslatableModel } from '@models/translatable-model';

export class DrawingProductType extends TranslatableModel {
  id: number;
  text: string;
  emoji: string;

  constructor(data: Partial<DrawingProductType> = {}) {
    super(data.code || '');
    this.id = data.id || -1;
    this.text = data.text || '';
    this.emoji = data.emoji || '';
  }
}
