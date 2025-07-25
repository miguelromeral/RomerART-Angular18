export interface ISaveDrawingRequest {
  isEditing: boolean;
  id: string;
  path: string;
  pathThumbnail: string;
  pathTimelapse: string;
  visible: boolean;
  type: number;
  filter: number;
  tagsText: string;
  name: string;
  modelName: string;
  spotifyUrl: string;
  blueskyUrl: string;
  instagramUrl: string;
  title: string;
  dateHyphen: string;
  software: number;
  paper: number;
  time: number;
  productType: number;
  productName: string;
  favorite: boolean;
  referenceUrl: string;
  scoreCritic: number;
  listComments: string[];
  listCommentsPros: string[];
  listCommentsCons: string[];
  listCommentsStyle: string[];

  // constructor(data: Partial<SaveDrawingRequest> = {}) {
  //   this.id = data.id || '';
  //   this.path = data.path || '';
  //   this.isEditing = data.isEditing || false;
  //   this.pathThumbnail = data.pathThumbnail || '';
  //   this.visible = data.visible || false;
  //   this.type = data.type || 0;
  //   this.tagsText = data.tagsText || '';
  //   this.name = data.name || '';
  //   this.modelName = data.modelName || '';
  //   this.spotifyUrl = data.spotifyUrl || '';
  //   this.title = data.title || '';
  //   this.dateHyphen = data.dateHyphen || '';
  //   this.software = data.software || 0;
  //   this.paper = data.paper || 0;
  //   this.time = data.time || 0;
  //   this.productType = data.productType || 0;
  //   this.productName = data.productName || '';
  //   this.favorite = data.favorite || false;
  //   this.referenceUrl = data.referenceUrl || '';
  //   this.scoreCritic = data.scoreCritic || 0;
  //   this.listComments = data.listComments || [];
  //   this.listCommentsPros = data.listCommentsPros || [];
  //   this.listCommentsCons = data.listCommentsCons || [];
  // }
}
