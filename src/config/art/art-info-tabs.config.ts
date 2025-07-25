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
  reference: string;
  timelapse: string;
}

export const artTabInfoIds: IArtInfoTabsConfigId = {
  comments: 'comments',
  style: 'style',
  likes: 'likes',
  dislikes: 'dislikes',
  spotify: 'spotify',
  details: 'details',
  vote: 'vote',
  reference: 'reference',
  timelapse: 'timelapse',
};

export class ArtInfoTabsConfig {
  static getTabs(
    drawing: Drawing,
    showScorePopular: boolean,
    showSpotify: boolean,
    showReference: boolean,
    showTimelapse: boolean
  ): TabPanelItem[] {
    return ArtInfoTabsConfig.tabs
      .filter(tab => {
        switch (tab.id) {
          case artTabInfoIds.vote:
            return tab.visible(drawing, showScorePopular);
          case artTabInfoIds.spotify:
            return tab.visible(drawing, showSpotify);
          case artTabInfoIds.reference:
            return tab.visible(drawing, showReference);
          case artTabInfoIds.timelapse:
            return tab.visible(drawing, showTimelapse);

          default:
            return tab.visible(drawing);
        }
      })
      .sort((a: TabPanelItem, b: TabPanelItem) => a.order - b.order);
  }

  static tabs: TabPanelItem[] = [
    {
      id: artTabInfoIds.comments,
      order: 100,
      icon: 'bi-chat',
      textCode: 'DETAILS.TAB-TITLES.COMMENTS',
      iconSelected: 'bi-chat-fill',
      visible: (drawing: Drawing) => drawing.listComments.length > 0,
    },
    {
      id: artTabInfoIds.style,
      order: 200,
      icon: 'bi-vector-pen',
      textCode: 'DETAILS.TAB-TITLES.STYLE',
      iconSelected: 'bi-vector-pen',
      visible: (drawing: Drawing) => drawing.listCommentsStyle.length > 0,
    },
    {
      id: artTabInfoIds.likes,
      icon: 'bi-hand-thumbs-up',
      order: 300,
      textCode: 'DETAILS.TAB-TITLES.LIKES',
      iconSelected: 'bi-hand-thumbs-up-fill',
      visible: (drawing: Drawing) => drawing.listCommentsPros.length > 0,
    },
    {
      id: artTabInfoIds.dislikes,
      order: 400,
      textCode: 'DETAILS.TAB-TITLES.DISLIKES',
      icon: 'bi-hand-thumbs-down',
      iconSelected: 'bi-hand-thumbs-down-fill',
      visible: (drawing: Drawing) => drawing.listCommentsCons.length > 0,
    },
    {
      id: artTabInfoIds.vote,
      order: 500,
      textCode: 'DETAILS.TAB-TITLES.VOTE',
      icon: 'bi-9-circle',
      iconSelected: 'bi-9-circle-fill',
      visible: (_: Drawing, visible?: boolean) => visible ?? false,
    },
    {
      id: artTabInfoIds.spotify,
      order: 600,
      textCode: 'DETAILS.TAB-TITLES.SPOTIFY',
      icon: 'bi-spotify',
      iconSelected: 'bi-spotify',
      visible: (drawing: Drawing, visible?: boolean) =>
        (visible ?? false) && drawing.spotifyUrl !== '',
    },
    {
      id: artTabInfoIds.details,
      order: 700,
      textCode: 'DETAILS.TAB-TITLES.INFO',
      icon: 'bi-info-circle',
      iconSelected: 'bi-info-circle-fill',
      visible: (drawing: Drawing) => drawing && true,
    },
    {
      id: artTabInfoIds.reference,
      order: 800,
      textCode: 'DETAILS.TAB-TITLES.REFERENCE',
      icon: 'bi-image',
      iconSelected: 'bi-image-fill',
      visible: (drawing: Drawing, visible?: boolean) =>
        (visible ?? false) && drawing.referenceUrl !== '',
    },
    {
      id: artTabInfoIds.timelapse,
      order: 900,
      icon: 'bi-play-btn',
      textCode: 'DETAILS.TAB-TITLES.TIMELAPSE',
      iconSelected: 'bi-play-btn-fill',
      visible: (drawing: Drawing, visible?: boolean) =>
        (visible ?? false) && drawing.urlTimelapse !== '',
    },
  ];
}
