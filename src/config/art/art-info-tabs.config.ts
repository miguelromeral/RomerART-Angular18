import { TabPanelItem } from '@models/components/tab-panel-item.model';

export interface IArtInfoTabsConfigId {
  comments: string;
  likes: string;
  dislikes: string;
  spotify: string;
  details: string;
  vote: string;
}

export const artTabInfoIds: IArtInfoTabsConfigId = {
  comments: 'comments',
  likes: 'likes',
  dislikes: 'dislikes',
  spotify: 'spotify',
  details: 'details',
  vote: 'vote',
};

export class ArtInfoTabsConfig {
  static getTabs(/*drawing: Drawing*/): TabPanelItem[] {
    // return this.tabs.filter(tab => tab.visible(drawing));
    return this.tabs;
  }

  static tabs: TabPanelItem[] = [
    {
      id: artTabInfoIds.comments,
      label: 'Comentarios',
      icon: 'bi-chat',
      iconSelected: 'bi-chat-fill',
      // visible: (drawing: Drawing) => drawing.comment !== '',
    },
    {
      id: artTabInfoIds.likes,
      label: 'Positivo',
      icon: 'bi-hand-thumbs-up',
      iconSelected: 'bi-hand-thumbs-up-fill',
      // visible: (drawing: Drawing) => drawing.commentPros !== '',
    },
    {
      id: artTabInfoIds.dislikes,
      label: 'Negativo',
      icon: 'bi-hand-thumbs-down',
      iconSelected: 'bi-hand-thumbs-down-fill',
      // visible: (drawing: Drawing) => drawing.commentCons !== '',
    },
    {
      id: artTabInfoIds.vote,
      label: 'Calificar',
      icon: 'bi-send-plus',
      iconSelected: 'bi-send-plus-fill',
      // visible: (drawing: Drawing) => drawing && true,
    },
    {
      id: artTabInfoIds.spotify,
      label: 'Spotify',
      icon: 'bi-spotify',
      iconSelected: 'bi-spotify',
      // visible: (drawing: Drawing) => drawing.spotifyUrl !== '',
    },
    {
      id: artTabInfoIds.details,
      label: 'Detalles',
      icon: 'bi-info-circle',
      iconSelected: 'bi-info-circle-fill',
      // visible: (drawing: Drawing) => drawing && true,
    },
  ];
}
