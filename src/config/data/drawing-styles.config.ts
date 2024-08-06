export interface IDrawingStyle {
  id: number;
  code: string;
  text: string;
  showSoftware: boolean;
  showPaper: boolean;
}

export const drawingStyles: IDrawingStyle[] = [
  {
    id: 1,
    code: 'DATA.DRAWING.STYLES.PENCILS',
    text: 'Lápices de Grafito',
    showSoftware: false,
    showPaper: true,
  },
  {
    id: 2,
    code: 'DATA.DRAWING.STYLES.DIGITAL',
    text: 'Digital',
    showSoftware: true,
    showPaper: false,
  },
  {
    id: 3,
    code: 'DATA.DRAWING.STYLES.SKETCH',
    text: 'Sketch',
    showSoftware: false,
    showPaper: true,
  },
  {
    id: 4,
    code: 'DATA.DRAWING.STYLES.MARKERS',
    text: 'Marcadores',
    showSoftware: false,
    showPaper: true,
  },
  {
    id: 5,
    code: 'DATA.DRAWING.STYLES.COLORED',
    text: 'Lápices de Colores',
    showSoftware: false,
    showPaper: true,
  },
  {
    id: 6,
    code: 'DATA.DRAWING.STYLES.PEN',
    text: 'Bolígrafo',
    showSoftware: false,
    showPaper: true,
  },
];
