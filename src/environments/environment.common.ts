import packageJson from '../../package.json';

export const COMMON_ENV = {
  appName: 'MiguelRomeral',
  appVersion: packageJson.version,
  social_links: [
    {
      texto: '_miguelromeral',
      icon: 'instagram',
      link: 'https://www.instagram.com/_miguelromeral/',
    },
    // {
    //   icon: "facebook",
    //   link: "-"
    // },
    // {
    //   icon: "linkedin",
    //   link: "-"
    // },
    // {
    //   icon: "spotify",
    //   link: "-"
    // },
    // {
    //   icon: "threads",
    //   link: "-"
    // },
    // {
    //   icon: "tiktok",
    //   link: "-"
    // },
    // {
    //   icon: "twitter-x",
    //   link: "-"
    // },
    // {
    //   icon: "whatsapp",
    //   link: "-"
    // },
    // {
    //   icon: "youtube",
    //   link: "-"
    // },
  ],
  customization: {
    dateFormat: 'DD/MM/YYYY HH:mm',
  },
  forms: {
    drawingFilter: {
      default: {
        sortBy: 'date-desc',
        textQuery: '',
        type: '-1',
        productType: '-1',
        productName: '',
        collection: '',
        characterName: '',
        modelName: '',
        software: '0',
        paper: '0',
        spotify: 'null',
        favorites: false,
      },
    },
  },
};
