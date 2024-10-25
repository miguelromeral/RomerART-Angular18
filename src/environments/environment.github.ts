// src/environments/environment.github.ts
import { COMMON_ENV } from './environment.common';

export const environment = {
  ...COMMON_ENV,
  production: true,
  firebase: {
    projectId: '<<FIREBASE_PROJECT_ID>>',
    appId: '<<FIREBASE_APP_ID>>',
    storageBucket: '<<FIREBASE_STORAGE_BUCKET>>',
    apiKey: '<<FIREBASE_API_KEY>>',
    authDomain: '<<FIREBASE_AUTH_DOMAIN>>',
    messagingSenderId: '<<FIREBASE_MESSAGING_SENDER_ID>>',
    measurementId: '<<FIREBASE_MEASUREMENT_ID>>',
  },
  firestore: {
    collection_articulos: 'articulos',
  },
  storage: {
    image_storage_path: 'imagenes/',
  },
  api: {
    url: '<<API_URL>>',
  },
  translation: {
    apiKey: '<<TRANSLATION_API_KEY>>',
    url: 'https://api.cognitive.microsofttranslator.com/',
    region: '<<TRANSLATION_REGION>>',
  },
  settings: {
    autoCollapsed: false,
  },
};
