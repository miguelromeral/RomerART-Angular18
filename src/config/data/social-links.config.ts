export interface ISocialLink {
  text?: string;
  icon: string;
  link: string;
}

export const socialLinksConfig: ISocialLink[] = [
  {
    // text: '_miguelromeral',
    icon: 'bi-instagram',
    link: 'https://www.instagram.com/_miguelromeral/',
  },
  {
    icon: 'bi-twitter-x',
    link: 'https://twitter.com/MiguelRomeral',
  },
  {
    icon: 'bi-spotify',
    link: 'https://open.spotify.com/user/miguelromeral',
  },
  {
    icon: 'bi-pinterest',
    link: 'https://www.pinterest.es/miguelromeral15/',
  },
  {
    icon: 'bi-linkedin',
    link: 'https://www.linkedin.com/in/miguelromeral/',
  },
  {
    icon: 'bi-github',
    link: 'https://github.com/miguelromeral/',
  },
];
