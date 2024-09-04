export interface IDrawingFilterEffect {
  id: number;
  labelCode: string;
}

export const drawingFilterEffects: IDrawingFilterEffect[] = [
  {
    id: 0,
    labelCode: 'DATA.DRAWING.FILTERS.NONE',
  },
  {
    id: 1,
    labelCode: 'DATA.DRAWING.FILTERS.SNAPSEED',
  },
  {
    id: 2,
    labelCode: 'DATA.DRAWING.FILTERS.PHOTOSHOP',
  },
  {
    id: 3,
    labelCode: 'DATA.DRAWING.FILTERS.INSTAGRAM',
  },
  {
    id: 4,
    labelCode: 'DATA.DRAWING.FILTERS.SAMSUNG',
  },
];
