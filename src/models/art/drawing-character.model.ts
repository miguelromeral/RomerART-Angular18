export class DrawingCharacter {
  characterName: string;
  productTypeId: number;
  productType: string;

  constructor(data: Partial<DrawingCharacter> = {}) {
    this.characterName = data.characterName || '';
    this.productTypeId = data.productTypeId || -1;
    this.productType = data.productType || '';
  }
}
