export interface INavBarLink {
  link: string;
  icon: string;
  iconActive: string;
  textCode: string;
  customClass?: string;
  image?: string;
}

export class NavBarConfig {
  static links: INavBarLink[] = [
    {
      link: '/',
      icon: 'bi-house-door',
      iconActive: 'bi-house-door-fill',
      textCode: 'LINKS.HOME',
    },
    {
      link: '/art',
      icon: 'bi-easel',
      iconActive: 'bi-easel-fill',
      textCode: 'LINKS.ART',
    },
    // {
    //   link: '/playlist',
    //   icon: 'bi-cassette',
    //   iconActive: 'bi-cassette-fill',
    //   textCode: 'LINKS.PLAYLIST',
    //   customClass: 'mr-spotify',
    // },
    {
      link: '/about',
      icon: '',
      iconActive: '',
      textCode: 'LINKS.ABOUT',
      image: 'assets/images/me/smile.png',
    },
    {
      link: '/settings',
      icon: 'bi-gear',
      iconActive: 'bi-gear-fill',
      textCode: 'LINKS.SETTINGS',
    },
    // {
    //   link: '/debug',
    //   icon: 'bi-bug',
    //   iconActive: 'bi-bug-fill',
    //   textCode: 'LINKS.DEBUG',
    // },
  ];
}
