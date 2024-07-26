export class NavBarConfig {
  static links = [
    {
      link: '/',
      icon: 'bi-house-door',
      iconActive: 'bi-house-door-fill',
      text: 'Inicio',
      customClass: '',
      image: '',
    },
    {
      link: '/art',
      icon: 'bi-easel',
      iconActive: 'bi-easel-fill',
      text: 'Art',
      customClass: '',
      image: '',
    },
    {
      link: '/playlist',
      icon: 'bi-cassette',
      iconActive: 'bi-cassette-fill',
      text: 'Playlist',
      customClass: 'mr-spotify',
      image: '',
    },
    {
      link: '/about',
      icon: '',
      iconActive: '',
      text: 'Sobre Mí',
      customClass: '',
      image: 'assets/images/miguel.jpeg',
    },
    {
      link: '/settings',
      icon: 'bi-gear',
      iconActive: 'bi-gear-fill',
      text: 'Ajustes',
      customClass: '',
      image: '',
    },
    {
      link: '/debug',
      icon: 'bi-bug',
      iconActive: 'bi-bug-fill',
      text: 'Debug',
      customClass: '',
      image: '',
    },
  ];
}
