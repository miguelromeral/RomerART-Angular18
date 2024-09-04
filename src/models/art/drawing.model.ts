import { environment } from 'environments/environment';

export class Drawing {
  id: string;
  path: string;
  pathThumbnail: string;
  urlBase: string;
  visible: boolean;
  type: number;
  tagsText: string;
  tags: string[];
  typeName: string;
  name: string;
  modelName: string;
  spotifyUrl: string;
  spotifyTrackId: string;
  title: string;
  date: string;
  dateObject: Date;
  dateHyphen: string;
  software: number;
  softwareName: string;
  paper: number;
  paperHuman: string;
  time: number;
  timeHuman: string;
  productType: number;
  productTypeName: string;
  productName: string;
  comment: string;
  commentPros: string;
  views: number;
  viewsHuman: string;
  likes: number;
  likesHuman: string;
  favorite: boolean;
  referenceUrl: string;
  scoreCritic: number;
  scorePopular: number;
  votesPopular: number;
  scorePopularHuman: number;
  listComments: string[];
  listCommentPros: string[];
  commentCons: string;
  listCommentCons: string[];
  listCommentsStyle: string[];
  url: string;
  urlThumbnail: string;
  isTraditional: boolean;
  formattedDate: string;
  formattedDateMini: string;
  instagramUrl: string;
  twitterUrl: string;
  popularity: number;
  filter: number;
  filterName: string;

  constructor(data: Partial<Drawing> = {}) {
    this.id = data.id || '';
    this.path = data.path || '';
    this.pathThumbnail = data.pathThumbnail || '';
    this.urlBase = data.urlBase || '';
    this.visible = data.visible || false;
    this.type = data.type || 0;
    this.tagsText = data.tagsText || '';
    this.tags = data.tags || [];
    this.typeName = data.typeName || '';
    this.name = data.name || '';
    this.modelName = data.modelName || '';
    this.spotifyUrl = data.spotifyUrl || '';
    this.spotifyTrackId = data.spotifyTrackId || '';
    this.title = data.title || '';
    this.date = data.date || '';
    // const [year, day, month] = this.date.split('/').map(x => parseInt(x));
    // this.dateTS = new Date(year, month - 1, day);
    this.dateObject = new Date(data.dateObject || '');
    this.dateHyphen = data.dateHyphen || '';
    this.software = data.software || 0;
    this.softwareName = data.softwareName || '';
    this.paper = data.paper || 0;
    this.paperHuman = data.paperHuman || '';
    this.time = data.time || 0;
    this.timeHuman = data.timeHuman || '';
    this.productType = data.productType || 0;
    this.productTypeName = data.productTypeName || '';
    this.productName = data.productName || '';
    this.comment = data.comment || '';
    this.commentPros = data.commentPros || '';
    this.views = data.views || 0;
    this.viewsHuman = data.viewsHuman || '';
    this.likes = data.likes || 0;
    this.likesHuman = data.likesHuman || '';
    this.favorite = data.favorite || false;
    this.referenceUrl = data.referenceUrl || '';
    this.scoreCritic = data.scoreCritic || 0;
    this.scorePopular = data.scorePopular || 0;
    this.votesPopular = data.votesPopular || 0;
    this.scorePopularHuman = data.scorePopularHuman || 0;
    this.listComments = data.listComments || [];
    this.listCommentPros = data.listCommentPros || [];
    this.commentCons = data.commentCons || '';
    this.listCommentCons = data.listCommentCons || [];
    this.listCommentsStyle = data.listCommentsStyle || [];
    this.url = data.url || '';
    this.urlThumbnail = data.urlThumbnail || '';
    this.isTraditional = data.isTraditional || false;
    this.formattedDate = data.formattedDate || '';
    this.formattedDateMini = data.formattedDateMini || '';
    this.instagramUrl = data.instagramUrl || '';
    this.twitterUrl = data.twitterUrl || '';
    this.popularity = data.popularity || 0;
    this.filter = data.filter || 0;
    this.filterName = data.filterName || '';
  }

  pageTitle(): string {
    if (this.name !== '' && this.modelName !== '') {
      return `${this.name}, por ${this.modelName}`;
    } else if (this.name !== '' || this.modelName !== '') {
      return this.name !== '' ? this.name : this.modelName;
    } else {
      return environment.appName;
    }
  }
}
