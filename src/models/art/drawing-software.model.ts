export class DrawingSoftware {
  id: number;
  name: string;

  constructor(data: Partial<DrawingSoftware> = {}) {
    this.id = data.id || -1;
    this.name = data.name || '';
  }
}
