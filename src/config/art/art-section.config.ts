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
  | 'votes'
  | 'likes'
  | 'sportman'
  | 'filter';

export interface IArtSectionType {
  id: ArtSectionType;
  icon: string;
  textCode?: string;
}

export class ArtSectionConfig {
  static types: IArtSectionType[] = [
    {
      id: '',
      icon: 'bi-emoji-heart-eyes',
    },
    {
      id: 'date',
      icon: 'bi-calendar-event',
    },
    {
      id: 'time',
      icon: 'bi-stopwatch',
    },
    {
      id: 'views',
      icon: 'bi-eye',
      textCode: 'VIEWS',
    },
    {
      id: 'votes',
      icon: 'bi-9-circle',
      textCode: 'VOTES',
    },
    {
      id: 'likes',
      icon: 'bi-heart',
    },
    {
      id: 'paper',
      icon: 'bi-aspect-ratio',
    },
    {
      id: 'game',
      icon: 'bi-controller',
    },
    {
      id: 'model',
      icon: 'bi-person',
    },
    {
      id: 'software',
      icon: 'bi-laptop',
    },
    {
      id: 'reference',
      icon: 'bi-image',
    },

    {
      id: 'actor',
      icon: 'bi-stars',
    },
    {
      id: 'singer',
      icon: 'bi-mic',
    },
    {
      id: 'sportman',
      icon: 'bi-dribbble',
    },
    {
      id: 'style',
      icon: 'bi-vector-pen',
    },
    {
      id: 'filter',
      icon: 'bi-stars',
    },
  ];
}
