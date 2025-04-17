import packageJson from '../../package.json';

export const COMMON_ENV = {
  appName: 'MiguelRomeral',
  appVersion: packageJson.version,
  customization: {
    dateFormat: 'DD/MM/YYYY HH:mm',
  },
  forms: {
    drawingFilter: {
      default: {
        sortBy: '',
        textQuery: '',
        type: -1,
        productType: -1,
        productName: '',
        collection: '',
        characterName: '',
        modelName: '',
        software: -1,
        paper: -1,
        spotify: 'null',
        favorites: false,
      },
    },
  },
};
