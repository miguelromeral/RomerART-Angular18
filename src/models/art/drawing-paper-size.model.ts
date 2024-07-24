export class DrawingPaperSize {
  id: number;
  name: string;

  constructor(data: Partial<DrawingPaperSize> = {}) {
    this.id = data.id || -1;
    this.name = data.name || '';
  }
}
