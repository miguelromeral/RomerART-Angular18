export type ArtSectionType =
  | ''
  | 'date'
  | 'time'
  | 'style'
  | 'paper'
  | 'game'
  | 'actor'
  | 'singer'
  | 'software'
  | 'reference'
  | 'model'
  | 'views'
  | 'sportman';

export interface IArtSectionType {
  id: ArtSectionType;
  icon: string;
  text: string;
}

export class ArtSectionConfig {
  static types: IArtSectionType[] = [
    // TODO: cambiar esto por sus codes para el idioma
    {
      id: 'date',
      icon: 'bi-calendar-event',
      text: 'Fecha',
    },
    {
      id: 'time',
      icon: 'bi-stopwatch',
      text: 'Tiempo',
    },
    {
      id: 'views',
      icon: 'bi-eye',
      text: 'Visualizaciones',
    },
    {
      id: 'style',
      icon: 'bi-easel',
      text: 'Estilo',
    },
    {
      id: 'paper',
      icon: 'bi-aspect-ratio',
      text: 'Papel',
    },
    {
      id: 'game',
      icon: 'bi-controller',
      text: 'Videojuego',
    },
    {
      id: 'model',
      icon: 'bi-person',
      text: 'Modelo',
    },
    {
      id: 'software',
      icon: 'bi-laptop',
      text: 'Software',
    },
    {
      id: 'reference',
      icon: 'bi-image',
      text: 'Referencia',
    },
    {
      id: 'actor',
      icon: 'bi-stars',
      text: 'Actor / Actriz',
    },
    {
      id: 'singer',
      icon: 'bi-mic',
      text: 'Cantante',
    },
    {
      id: 'sportman',
      icon: 'bi-dribbble',
      text: 'Deportista',
    },
  ];
}
