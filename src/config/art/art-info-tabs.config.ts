import { Drawing } from '@models/art/drawing.model';
import { TabPanelItem } from '@models/components/tab-panel-item.model';

export interface IArtInfoTabsConfigId {
  comments: string;
  style: string;
  likes: string;
  dislikes: string;
  spotify: string;
  details: string;
  vote: string;
}

export const artTabInfoIds: IArtInfoTabsConfigId = {
  comments: 'comments',
  style: 'style',
  likes: 'likes',
  dislikes: 'dislikes',
  spotify: 'spotify',
  details: 'details',
  vote: 'vote',
};

export class ArtInfoTabsConfig {
  static getTabs(
    drawing: Drawing,
    showScorePopular: boolean,
    showSpotify: boolean
  ): TabPanelItem[] {
    return ArtInfoTabsConfig.tabs.filter(tab => {
      switch (tab.id) {
        case artTabInfoIds.vote:
          return tab.visible(drawing, showScorePopular);
          break;
        case artTabInfoIds.spotify:
          return tab.visible(drawing, showSpotify);

          break;
        default:
          return tab.visible(drawing);
      }
    });
  }

  static tabs: TabPanelItem[] = [
    {
      id: artTabInfoIds.comments,
      icon: 'bi-chat',
      textCode: 'DETAILS.TAB-TITLES.COMMENTS',
      iconSelected: 'bi-chat-fill',
      visible: (drawing: Drawing) => drawing.comment !== '',
    },
    {
      id: artTabInfoIds.style,
      icon: 'bi-patch-exclamation',
      textCode: 'DETAILS.TAB-TITLES.STYLE',
      iconSelected: 'bi-patch-exclamation-fill',
      visible: (drawing: Drawing) => drawing.listCommentsStyle.length > 0,
    },
    {
      id: artTabInfoIds.likes,
      icon: 'bi-hand-thumbs-up',
      textCode: 'DETAILS.TAB-TITLES.LIKES',
      iconSelected: 'bi-hand-thumbs-up-fill',
      visible: (drawing: Drawing) => drawing.commentPros !== '',
    },
    {
      id: artTabInfoIds.dislikes,
      textCode: 'DETAILS.TAB-TITLES.DISLIKES',
      icon: 'bi-hand-thumbs-down',
      iconSelected: 'bi-hand-thumbs-down-fill',
      visible: (drawing: Drawing) => drawing.commentCons !== '',
    },
    {
      id: artTabInfoIds.vote,
      textCode: 'DETAILS.TAB-TITLES.VOTE',
      icon: 'bi-9-circle',
      iconSelected: 'bi-9-circle-fill',
      visible: (_: Drawing, visible?: boolean) => visible ?? false,
    },
    {
      id: artTabInfoIds.spotify,
      textCode: 'DETAILS.TAB-TITLES.SPOTIFY',
      icon: 'bi-spotify',
      iconSelected: 'bi-spotify',
      visible: (drawing: Drawing, visible?: boolean) =>
        (visible ?? false) && drawing.spotifyUrl !== '',
    },
    {
      id: artTabInfoIds.details,
      textCode: 'DETAILS.TAB-TITLES.INFO',
      icon: 'bi-info-circle',
      iconSelected: 'bi-info-circle-fill',
      visible: (drawing: Drawing) => drawing && true,
    },
  ];
}
