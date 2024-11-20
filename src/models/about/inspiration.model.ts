export class Inspiration {
  id: string;
  name: string;
  instagram: string | null;
  twitter: string | null;
  bluesky: string | null;
  youTube: string | null;
  twitch: string | null;
  pinterest: string | null;
  type: number;
  typeName: string;

  constructor(data: Partial<Inspiration> = {}) {
    this.id = data.id || '';
    this.instagram = data.instagram || '';
    this.twitter = data.twitter || '';
    this.bluesky = data.bluesky || '';
    this.youTube = data.youTube || '';
    this.twitch = data.twitch || '';
    this.twitch = data.twitch || '';
    this.type = data.type || 0;
    this.pinterest = data.pinterest || '';
    this.typeName = data.typeName || '';
    this.name = data.name || '';
  }
}
