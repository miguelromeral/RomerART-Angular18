import packageJson from '../../package.json';

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
    available: [
      {
        code: 'es',
        text: 'Espñol',
      },
      // {
      //   code: 'en',
      //   text: 'English',
      // },
    ],
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
