export interface ISocialLink {
  text?: string;
  icon: string;
  link: string;
  name: string;
  showInCV: boolean;
  showInAbout: boolean;
}

export const socialLinksConfig: ISocialLink[] = [
  {
    // text: '_miguelromeral',
    name: 'Instagram',
    icon: 'bi-instagram',
    link: 'https://www.instagram.com/_miguelromeral/',
    showInCV: false,
    showInAbout: true,
  },
  {
    name: 'Bluesky',
    icon: 'bi-at',
    link: 'https://bsky.app/profile/miguelromeral.bsky.social',
    showInAbout: true,
    showInCV: false,
  },
  {
    name: 'Spotify',
    icon: 'bi-spotify',
    link: 'https://open.spotify.com/user/miguelromeral',
    showInAbout: true,
    showInCV: false,
  },
  {
    name: 'Pinterest',
    icon: 'bi-pinterest',
    link: 'https://www.pinterest.es/miguelromeral15/',
    showInAbout: true,
    showInCV: false,
  },
  {
    name: 'LinkedIn',
    icon: 'bi-linkedin',
    link: 'https://www.linkedin.com/in/miguelromeral/',
    showInAbout: true,
    showInCV: true,
  },
  {
    icon: 'bi-github',
    name: 'GitHub',
    link: 'https://github.com/miguelromeral/',
    showInAbout: true,
    showInCV: true,
  },
  {
    name: 'Google Play',
    icon: 'bi-google-play',
    link: 'https://play.google.com/store/apps/dev?id=8494694764432462089',
    showInAbout: true,
    showInCV: true,
  },
  {
    name: 'Credly',
    icon: 'bi-award',
    link: 'https://www.credly.com/users/miguelromeral/badges',
    showInAbout: false,
    showInCV: true,
  },
];
