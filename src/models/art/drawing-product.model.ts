export class DrawingProduct {
  productName: string;
  productTypeId: number;
  productType: string;

  constructor(data: Partial<DrawingProduct> = {}) {
    this.productName = data.productName || '';
    this.productTypeId = data.productTypeId || -1;
    this.productType = data.productType || '';
  }
}
