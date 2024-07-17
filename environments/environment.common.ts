import packageJson from '../package.json';

export const COMMON_ENV = {
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
  language: {
    default: 'es',
    available: ['es', 'en'],
    flagIcons: ['es', 'sh'],
  },
};
