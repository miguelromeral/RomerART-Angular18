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
  data: {
    styles: [
      {
        id: 1,
        code: 'DATA.DRAWING.STYLES.PENCILS',
        text: 'Lápices de Grafito',
      },
      {
        id: 2,
        code: 'DATA.DRAWING.STYLES.DIGITAL',
        text: 'Digital',
      },
      {
        id: 3,
        code: 'DATA.DRAWING.STYLES.SKETCH',
        text: 'Sketch',
      },
      {
        id: 4,
        code: 'DATA.DRAWING.STYLES.MARKERS',
        text: 'Marcadores',
      },
      {
        id: 5,
        code: 'DATA.DRAWING.STYLES.COLORED',
        text: 'Lápices de Colores',
      },
      {
        id: 6,
        code: 'DATA.DRAWING.STYLES.PEN',
        text: 'Bolígrafo',
      },
    ],
    productTypes: [
      {
        id: 1,
        code: 'DATA.DRAWING.PRODUCTS_TYPES.VIDEOGAME',
        emoji: '🎮',
      },
      {
        id: 2,
        code: 'DATA.DRAWING.PRODUCTS_TYPES.ACTOR',
        emoji: '🎞',
      },
      {
        id: 3,
        code: 'DATA.DRAWING.PRODUCTS_TYPES.SINGER',
        emoji: '🎙',
      },
      {
        id: 4,
        code: 'DATA.DRAWING.PRODUCTS_TYPES.SPORTMAN',
        emoji: '⚽',
      },
      {
        id: 5,
        code: 'DATA.DRAWING.PRODUCTS_TYPES.INFLUENCER',
        emoji: '📷',
      },
    ],
    softwares: [
      {
        id: 1,
        name: 'Medibang Paint',
      },
      {
        id: 2,
        name: 'Clip Studio Paint',
      },
      {
        id: 3,
        name: 'Adobe Photoshop',
      },
    ],
    paperSizes: [
      {
        id: 3,
        name: 'A3',
      },
      {
        id: 4,
        name: 'A4',
      },
      {
        id: 5,
        name: 'A5',
      },
      {
        id: 6,
        name: 'A6',
      },
    ],
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
  utils: {
    hearts: {
      bootstrapIcon: 'bi-heart-fill',
      size: {
        min: 0.5,
        max: 1.5,
      },
      maxColor: {
        red: 256,
        green: 50,
        blue: 50,
      },
      duration: {
        min: 2,
        max: 3,
      },
      messages: [
        'Muchas gracias por el like 😉',
        'Tú sí que eres una obra de arte 😁',
        'Eres muy amable, ¡gracias! 😘',
        'Significa mucho para mí 🥺',
        'Todos estos corazones son tuyos 💖',
        '¡Gracias, gracias, gracias! 🙏',
        'Me alegro de que te guste 😊',
        '¿Le diste sin querer? aún así, ¡gracias! 😂',
        'Haré saber al modelo que le gustas 🙊',
        'Eres muy grande 🙂',
        '¡Gracias, un abrazo! 🤗',
        '¡Gracias por tocar 2 veces la imagen! ✌',
        'Gracias, generoso 😏',
        'Gracias, eres un sol ☀',
        'Se te cayó esto, mi rey 👑',
        'Se te cayó esto, mi reina 👑',
        'Mereció la pena dibujarlo por esto 🥰',
        '¿Tienes curiosidad por ver todas las frases? 🙃',
        "Eres mu' salao' 🧂",
        '¡Gracias! 😁',
        'Thank you! 😎',
        'Si apagas la pantalla ahora, verás algo más bello aún 😜',
        '¡Gracias! No olvides ver el resto de la galería 🖼',
      ],
    },
  },
};
