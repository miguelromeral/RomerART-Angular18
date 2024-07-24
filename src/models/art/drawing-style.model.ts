import { TranslatableModel } from '@models/translatable-model';

export class DrawingStyle extends TranslatableModel {
  id: number;
  text: string;

  constructor(data: Partial<DrawingStyle> = {}) {
    super(data.code || '');
    this.id = data.id || -1;
    this.text = data.text || '';
  }
}
