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
      icon: 'bi-chat',
      textCode: 'DETAILS.TAB-TITLES.COMMENTS',
      iconSelected: 'bi-chat-fill',
      // visible: (drawing: Drawing) => drawing.comment !== '',
    },
    {
      id: artTabInfoIds.likes,
      icon: 'bi-hand-thumbs-up',
      textCode: 'DETAILS.TAB-TITLES.LIKES',
      iconSelected: 'bi-hand-thumbs-up-fill',
      // visible: (drawing: Drawing) => drawing.commentPros !== '',
    },
    {
      id: artTabInfoIds.dislikes,
      textCode: 'DETAILS.TAB-TITLES.DISLIKES',
      icon: 'bi-hand-thumbs-down',
      iconSelected: 'bi-hand-thumbs-down-fill',
      // visible: (drawing: Drawing) => drawing.commentCons !== '',
    },
    {
      id: artTabInfoIds.vote,
      textCode: 'DETAILS.TAB-TITLES.VOTE',
      icon: 'bi-9-circle',
      iconSelected: 'bi-9-circle-fill',
      // visible: (drawing: Drawing) => drawing && true,
    },
    {
      id: artTabInfoIds.spotify,
      textCode: 'DETAILS.TAB-TITLES.SPOTIFY',
      icon: 'bi-spotify',
      iconSelected: 'bi-spotify',
      // visible: (drawing: Drawing) => drawing.spotifyUrl !== '',
    },
    {
      id: artTabInfoIds.details,
      textCode: 'DETAILS.TAB-TITLES.INFO',
      icon: 'bi-info-circle',
      iconSelected: 'bi-info-circle-fill',
      // visible: (drawing: Drawing) => drawing && true,
    },
  ];
}
