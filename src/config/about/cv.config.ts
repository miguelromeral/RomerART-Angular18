import {
  ICertfication,
  IExperience,
  IExperienceLanguage,
  IExperienceTecnologyList,
  IPersonalInfo,
  IPersonalProject,
  IPersonalStrength,
} from '@models/about/cv.model';
import { socialLinksConfig } from 'config/data/social-links.config';

export const personalInfoConfig: IPersonalInfo = {
  name: 'MiguelRomeral',
  fullName: 'Miguel Ángel García Romeral',
  birthday: new Date(1996, 0, 12),
  birthplace: 'Alcalá de Henares, Madrid',
  homeplace: 'Alcalá de Henares, Madrid',
  college: 'Universidad de Alcalá',
  collegeUrl: 'https://www.uah.es/es/',
  decree: "Ing. Informática '18",
  fullDecree: 'Grado en Ingeniería Informática, en Octubre de 2018',
};

export const experienceConfig: IExperience[] = [
  {
    name: 'Prodware Spain',
    presencial: true,
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAmVBMVEX////C3O2GvN+Kvd6JutyGt9qKuNqvzuXs9/yVvtkAh8cGi8kKhMMUfr0Afb8Adbn6/f6Xu9IUjsofi8hGkcb3/P4Yks0Ad68Ac60Acq8AdbVioM3I3ejn7O7T3eN5ob4Ab7aVs8Th8Phvp9E4lsypv8uEq8JaptC63O/W6fTR5fJct+Itpts4qdw0pNkRk8e6zNZ9scudxdqyNgJaAAAA2UlEQVR4Ab3QAxIDQRBA0Y4x2M0oNte4/+HSsY1fnHpj+HmZbC6XzxcKxVL5EitVUqWUcW5ZBfsca0IIKSU6s5S+QCPqjWazxVHb52gM6XS73V6/xfggc4pDxNFmGmet8TlOxAaBMS5PcSoM2T5CMUbhtNl8AZskZRJu5HDK2rBL71oP3ImUvLQl2/OxwPfDoAyOIUSKqth/qh+sC8OwDFmDyaq7w160XoeKiP9kyARtVzxLkiTnBaGPTxn2azFclPoBrtx1if57OEQcvYVx5Ac23KqXluEfLQEUjhdbGzIJWQAAAABJRU5ErkJggg==',
    url: 'https://www.prodwaregroup.com/es-es/',
    beginDate: new Date(2019, 0, 8),
    endDate: new Date(2019, 8, 13),
    address: 'Av. del General Perón, 38, Tetuán, 28020 Madrid',
    remoto: false,
    roleDescriptionCode: 'DATA.CV.PRODWARE',
    tecnology: undefined,
    references: undefined,
    colorVariable: 'var(--mr-color-prodware)',
    projects: [
      {
        name: 'Openbank',
        remoto: false,
        url: 'https://www.openbank.es/',
        logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAXVBMVEVHcEz/0eb/aZv/kLD/ZIj/YIf/SHj/SHj/ZIn/b4//p77/N2f/BUz/AEb/GFT/Q3T/I1j/MmH/OG7/LWX/EE//W4f/nL3/utH/T3z/KFz/I1r/L2n/Wo7/J1//XoYlPOn2AAAAH3RSTlMABAkTT5TBuYE0Iqj///KC5ZZncvpcPzWuidjeRcibMQFQ8gAAAKRJREFUeAHd0IMBBDEQAMCNjbPTf5m/b6WCm9iAsyGUEqhjXEilDYUK63zwPsTEKutcyE3bub5v4c/g80BwTnLGjp8mAmQOCwFEWbvmT5IC3eIAN3sOX7bPwSUoeNszDr62xYtpICK2QNZ1Ao6D7wt1MRocDAvY3g/Q9gd9PyX6hC3u1w7ffXRH0OT3E3AqtjJmq/n/PqvlzE2RwtQ+HuuYYftULo4hC4ARRmzAAAAAAElFTkSuQmCC',
        beginDate: new Date(2019, 2, 1),
        endDate: new Date(2019, 8, 13),
        colorVariable: 'var(--mr-color-openbank)',
        address: undefined,
        projects: undefined,
        roleDescriptionCode: 'DATA.CV.OPENBANK',
        tecnology: [
          {
            level: 1,
            name: 'SQL',
          },
          {
            level: 1,
            name: 'C#',
          },

          {
            level: 1,
            name: 'Javascript',
          },

          {
            level: 1,
            name: 'ServiceNow',
          },

          {
            level: 1,
            name: 'Unified Service Desk 3.3',
          },
          {
            level: 2,
            name: 'Microsoft Dynamics 365 CRM',
          },
        ],
        references: [
          {
            name: 'Alejandro José Veiga Rico',
            role: 'Mentor',
          },
        ],
        presencial: false,
      },
    ],
  },
  {
    name: 'Sopra Steria ES',
    remoto: false,
    colorVariable: 'var(--mr-color-sopra)',
    beginDate: new Date(2021, 1, 8),
    endDate: new Date(2023, 9, 1),
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAES0lEQVR4Ae1WA9QjSRis6Zxt25Oes23btm3GOdu2bdu+UbC2Fa45V9/b+bNZ74+HQ71Xg6C7+jP+Ffgf3wLzFaEXy2HjpWfkX9hyEXQkAsDIw1rXiejjXKVv8pR+1TGiv7qG7sv3kjMzu3uG9TnvtznzmbugrbAXsExfWdfnDf2do8xRRWUFfdQmQQ+yq9o46MT3wizYmd91J+W3eaUnO8p6jNZaAM0oJ3HwmAzuqyTwYTmBT0sJPFuKI1u7GSd1W3/tXVzod2SDQWqzoKcsxGdf6cBtJUVQX7WpPF+DFnCzzMQbEQS3Iph8E4JJZHALeTeCUhrv9N5pxW0dbHImN3zKVrpLjov0oggR5LVBhFiEFhzyG9ZecaqAGCoTsgh4+gYnUVA1gbffOBoRNOEvrLJIfj5rH49mdNRG/cX0PUKLzKsAj+wmIiLmyQ0BNH9j85EpBLUExldvwBaYA37HRst6EevknKHf58LjxCpduPC8uKb3VDfcB0EljqeC26YJGJ1GMCKG0vDbsTjmEc78elNXWTdRTFFcI3FSmIOL+L3cn4dgSBor8MSOxEA1tMCIOMaRJloJyXk/oo/k5m/YKloX93Qn8zOIYUaIpR6elgXXYo1aHD+IiFG0wMSbKCKBa9AO5LDBOtz08rxhfcn7GPG7uEkowuyIeTiaMeQqLFpJ4X5xQXA7rRFD79AN7YYNy6RFzs2r6KNFQ3/EbLoMswNrwv4U4Uga8vmh9lRMtBVdrsHi1QxijIk6A/O0NglIQ/G/V3CNc9BWlK5HlFlySFtPU09ge3Lk+Jvw+ZAYtsPcIN3rc2yyKDoQI67HqcEdCOpp1pYUbh+WxmIzmxwbLu6o6BvMYXYvswfT5iW+n/c7Nlwb7YcUuy+k1kiJryfx+6AYtkIzXGVe0J/ViQLIjaVQSAdjzkZrbKXvuhF9qlQ+tBFscCeMy8rmFHGzFDuMYJ3Zq0mA9UxvtclMNZsFpdFuaZl+jtKP5NjTWxsTrKyrluOoS4pLtZXmx3pTGZHGNqEA/SRPPccG0iksJHye7HMmYEM6z8cmq2EewK66BE9cbhEgFHdQ1LcQ8GTZPg0Bc6a0427hkMH34Tmln/Xn0/t9i7UWwmwwPIkDeeLJ9VRDAC1AATGMheCviHVgsZVDhkfyP40BxTN0QUY0tusdfsFqCzdSMY4NWdC6iNmrCZJxUCPFAkzx/o0+/5faqBieqtX0KaBL6CJaJJB4sbHx0902Xe2I4Wn8KEOOBKEMPMLxfB6XQV+65bDmen2QZIGI8FthhVw4+7U0m7y8G6bvInpVT73OGqUHsNrwOHYrJXE60/Eymv+SahrH9LoUK87cTiP6BDaLLlyw0blEULcmdg/TtE/4nZzeVmZFAtNW1s3efHqnb7HbfO2Y8fViXGRfBuZ1PruXy4nHlrHaiH5mG+bnrmF+yCL1NE9/G+8XezKiYYNV21qu/8f/+BucWW4MzoYIwAAAAABJRU5ErkJggg==',
    url: 'https://www.soprasteria.es/',
    address: 'Av. de Manoteras, 48, Hortaleza, 28050 Madrid',
    roleDescriptionCode: 'DATA.CV.SOPRA',
    references: undefined,
    presencial: false,
    tecnology: undefined,
    projects: [
      {
        name: 'Airbus D&S: Defence & Space',
        address: 'P.º John Lennon, s/n, 28906 Getafe, Madrid',
        remoto: false,
        beginDate: new Date(2021, 3, 5),
        endDate: new Date(2022, 8, 30),
        url: 'https://www.airbus.com/en/our-worldwide-presence/airbus-in-europe/airbus-in-spain',
        logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAJ1BMVEUHGj309PQAEzkAACjv7+8eLEr7+/o4QVm8v8SusbiZnKZla3zr7OwhxjqcAAAAeElEQVQokdXR6wrAIAgF4NS0rL3/806DLRau39uhQKqvC6X03yBu5kaLQyqi9OIYcoYSW1KfrCF1eLxRg9CsR9QhcIGQOlSiGlF001oPqRG7DEBEB7SIsmRZqAP1IfYtFlpExnq0PazsD8oWvN406/tUnNXm4z6cE6bqAogxcHClAAAAAElFTkSuQmCC',
        colorVariable: 'var(--mr-color-airbus)',
        projects: undefined,
        references: [
          {
            name: 'Raimundo Prieto Alonso',
            role: 'Lead Developer',
          },
          {
            name: 'Cristóbal Miranda Puente',
            role: 'Airbus Project Manager',
          },
        ],
        presencial: true,
        roleDescriptionCode: 'DATA.CV.AIRBUS',
        tecnology: [
          {
            level: 3,
            name: 'C#',
          },
          {
            level: 3,
            name: 'HTML',
          },
          {
            level: 2,
            name: '.NET Framework standard 4.5',
          },
          {
            level: 2,
            name: 'Javascript',
          },
          {
            level: 2,
            name: 'MySQL',
          },
          {
            level: 1,
            name: 'Subversion',
          },
          {
            level: 1,
            name: 'Jenkins',
          },
          {
            level: 1,
            name: 'Windows Server',
          },
        ],
      },
      {
        name: 'SAS: Servicio Andaluz de Salud',
        url: 'https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/',
        remoto: true,
        address: undefined,
        logo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjUlHyU3Lzc3NzUvNjUuLzc4Njc3Ny41LzcvNzc1NTU4LzU3LS81LS0tKzA4ODc1NTc1NTU3K//AABEIABwAHAMBEQACEQEDEQH/xAAbAAABBAMAAAAAAAAAAAAAAAAGAgMEBwABBf/EACsQAAEDBAEBBQkAAAAAAAAAAAECAxEABAUSBjEHE1FhcSEiIyQyQXKBkf/EABkBAAMBAQEAAAAAAAAAAAAAAAECBAMFAP/EAB4RAAIDAAIDAQAAAAAAAAAAAAABAgMREkEEEzEh/9oADAMBAAIRAxEAPwAAIqI4WhXwfg1zy5F0+LsWdswoI7wtd5usiSAJHQRPqKaEHIpopdib04mexL2DzN3jLhQW5br13AgKBAIMeYINK1jxmVkeEnEgRXhdHA2txaW2kFbi1BKUpElRPQClbM1+vC2OTZBXZ9xLC4fHq+fU6h98pMbBKgpcnwUqE/jIreT9cUkdOySorjFEHtfsGbxnFcmsfeYumg2tQ+8jZs/zYfoULl8kjPzI6lNFaRWWkGhz2U4Vu/5CvI3ZQLbGJDp3IjczpPkIUZ8QKaqPKWvoo8OtSnyfQm4y+A5FzDJX/KHX04/u+7sw0FTCTA+kSJGyvVRocozm3L4N7arLW7PnQd2Nhgc9wS4wWAyBum0oUWQ+v4jS9ipMggEDby6VulGUOMWVpV2VOEHpSGsSCII6ipDj6OhCSBImi0AwgUBTRbSeomg0FCFewwKZLRkf/9k=',
        beginDate: new Date(2022, 9, 1),
        endDate: new Date(2023, 8, 30),
        colorVariable: 'var(--mr-color-sas)',
        presencial: false,
        projects: undefined,
        references: undefined,
        roleDescriptionCode: 'DATA.CV.SAS',
        tecnology: [
          {
            level: 3,
            name: 'C#',
          },
          {
            level: 3,
            name: 'HTML',
          },
          {
            level: 2,
            name: '.NET Core 3.1',
          },
          {
            level: 2,
            name: 'Typescript',
          },
          {
            level: 2,
            name: 'Angular',
          },
          {
            level: 2,
            name: 'Git',
          },
          {
            level: 1,
            name: 'Node.js',
          },
          {
            level: 1,
            name: 'Jira',
          },
          {
            level: 1,
            name: 'SonarQube',
          },
          {
            level: 1,
            name: 'Docker',
          },
          {
            level: 1,
            name: 'HELM',
          },
          {
            level: 1,
            name: 'Jenkins',
          },
          {
            level: 1,
            name: 'PL/SQL',
          },
        ],
      },
    ],
  },
  {
    name: 'Valum | Sociedad de Tasaciones y Valoraciones',
    remoto: false,
    colorVariable: 'var(--mr-color-valum)',
    beginDate: new Date(2024, 10, 27),
    endDate: new Date(2025, 3, 3),
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAKlBMVEUWdnFHcEwWdnEWdnEWdnEWdnEWdnEWdnEWdnEWdnEWdnEWdnEWdnEWdnH0gh+7AAAADnRSTlP/AO0THTuSqCy5gM9abuPWbfcAAADcSURBVCiRjdLrrsMgCABgFBDq5f1f9yhklK0ny/zRJnzeQKB8GfAb4hdcTX0OPXFVaCdMTfQTtwE0LNgAhN6xH4NBRc5fMOGZvseldMEDbU8QVbPaiDsG8mXGYQNc7cwdDus0x/lhXIg7vdm+nKY82UKw0K3Oe2Xh6lZmdUt5RqjbnMopT7cxcZkNTnn6eWOSF+pi6nyvPMFkKvsTZ2LfW1FzUxWbEhfC/rIo4kp5onjNye083ydKoRHrUpuQ7Jqf165hqcFUrNjUwnJrkj+itlme+Bp3j/7Y1P+MP0KEBx2Y9fHCAAAAAElFTkSuQmCC',
    url: 'https://www.valumre.com/',
    address: 'Av. de Europa, 26, Ática 1 3º, 28224 Pozuelo de Alarcón, Madrid',
    roleDescriptionCode: 'DATA.CV.VALUM',
    references: undefined,
    presencial: false,
    tecnology: undefined,
    projects: [
      {
        name: 'Inteligencia Versátil',
        address: undefined,
        remoto: true,
        beginDate: new Date(2024, 10, 27),
        endDate: new Date(2025, 3, 3),
        url: 'https://inteligenciaversatil.com/',
        logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAM1BMVEVHcEwDAwQDAwQDAwQDAwQDAwQDAwQDAwQDAwQDAwQDAwQDAwQDAwQDAwQDAwQDAwQDAwS9OwjRAAAAEXRSTlMAVrByoP8zZyPuQ8SPf+INFdYJ1O0AAACFSURBVHgB5Y5RDgMhCAURHSvuar3/aRsJMfvTE+x8kTcAyPtI+kdkLQlqNOnnoRoOJiLV2LQjQWu/AJEEV68KEtzsax3qdr5SGSEnXw/6bkgeLWZIiKLG3DMzzl9DAiyKQg53S8P/HJSQi20HOyg+nWFJkADiXsZJcmhqs0TvKmba5E38AFPWA4euT3ZHAAAAAElFTkSuQmCC',
        colorVariable: 'var(--mr-color-iv)',
        projects: undefined,
        references: [
          {
            name: 'Arturo Aguado Arnold',
            role: 'CTO',
          },
        ],
        presencial: false,
        roleDescriptionCode: 'DATA.CV.IV',
        tecnology: [
          {
            level: 3,
            name: '.NET Core 8.0',
          },
          {
            level: 2,
            name: 'SQL',
          },
          {
            level: 2,
            name: 'Git',
          },
          {
            level: 1,
            name: 'LaTeX',
          },
          {
            level: 1,
            name: 'Jira',
          },
          {
            level: 1,
            name: 'Angular',
          },
        ],
      },
    ],
  },
  {
    name: 'Infortec Consultores S.A.',
    remoto: true,
    colorVariable: 'var(--mr-color-infortec)',
    beginDate: new Date(2025, 3, 28),
    endDate: undefined,
    logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAgCAIAAABhFeQrAAAA7UlEQVR4Ae3WIWjDQBSA4U/Ow+zU7FRVXc1Moa6e1taLelkXKExOV9WUqNq6eKLj5+JCyGxYAtnlMmZy/OqJL4F74mj+pv5pHdiAW3JmH9iOI7l+V8VS1Ml73Qs4UgXWkIJtr3tqfTO0khVPVF03Adkot2bPirrrZuCVK+lAgXuW+O15hO5vTspNf3cO4B7qDvYR6RYUlJ35ebRbsOGFZxbcJnFLFmDJGuAR76bg1LpG7OLdT9DeUGyoJ3Fv/+XO7uzO7rrlJlO5by3oi3dQjHOvrcnDz3OkCXVzks7vZBzYsucS8e7rr4p+T8b3DV/J92lg2IcPAAAAAElFTkSuQmCC',
    url: 'https://infortec.net/',
    address:
      'C. de la Condesa de Venadito, 1, planta 1, Cdad. Lineal, 28027 Madrid',
    roleDescriptionCode: 'DATA.CV.INFORTEC',
    references: undefined,
    presencial: false,
    tecnology: undefined,
    projects: [
      {
        name: 'Fundae: Fundación Estatal para la Formación en el Empleo',
        address: 'C. de Torrelaguna, 56, Cdad. Lineal, 28027 Madrid',
        remoto: false,
        beginDate: new Date(2025, 3, 28),
        endDate: undefined,
        url: 'https://www.fundae.es/',
        logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAOVBMVEVHcEz/3HP/yVH/vzT/vCz/wTj/z1v/uif/shD/sg7/rgH/txv/sxL/wDL/uSH/sAj/vS7/tx7/xULcMabTAAAAE3RSTlMADidOZ0MaiuLu/73VWZ/4eqo3uF09bQAAAKRJREFUeAHlTYWBBDAIgyqk3v2HfXi3Ce5Sb4weGxxiSpn/o0oVFQG0/jSwbVVbtDMr8I1NHb1k0fH2rIB8hs2aFmTNQm9oQCfH3qFlF6PzOzcAbPIa6ScQXQFw3lhLgfp1l+pnRMv21S6X2ACs6wE3qJFjTabqn6owdOdocpvYFdMbOhyf8XG3a+3OOXssGXLM5phIFFQSvSPkHPjjsbcbmJ4ZL5Q3Br10+hUvAAAAAElFTkSuQmCC',
        colorVariable: 'var(--mr-color-fundae)',
        projects: undefined,
        references: undefined,
        presencial: false,
        roleDescriptionCode: 'DATA.CV.FUNDAE',
        tecnology: [
          {
            level: 3,
            name: '.NET Core 6.0',
          },
          {
            level: 3,
            name: 'Angular',
          },
          {
            level: 2,
            name: 'Git',
          },
          {
            level: 2,
            name: 'TFVC',
          },
          {
            level: 1,
            name: 'SQL',
          },
        ],
      },
    ],
  },
];

export const experienceLanguagesConfig: IExperienceLanguage[] = [
  {
    language: 'Español',
    level: 'Nativo',
    date: undefined,
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1125px-Bandera_de_Espa%C3%B1a.svg.png',
    certificate: undefined,
    urlCertificate: undefined,
  },
  {
    language: 'Inglés',
    level: 'Global CEFR Level: C',
    date: new Date(2020, 10, 18),
    flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/1200px-Flag_of_the_United_Kingdom_%283-5%29.svg.png',
    certificate: 'Certificado APTIS',
    urlCertificate: 'https://www.britishcouncil.es/examenes/aptis/puntuacion',
  },
];

export const experienceTecnologyConfig: IExperienceTecnologyList = {
  issues: [
    {
      level: undefined,
      name: 'Jira',
    },
    {
      level: undefined,
      name: 'ServiceNow',
    },
  ],
  version: [
    {
      level: undefined,
      name: 'Git',
    },
    {
      level: undefined,
      name: 'Subversion',
    },
  ],
  cloud: [
    {
      level: undefined,
      name: 'Google Firebase',
    },
    {
      level: undefined,
      name: 'Microsoft Azure',
    },
  ],
  quality: [
    {
      level: undefined,
      name: 'SonarQube',
    },
  ],
  frameworks: [
    {
      level: undefined,
      name: '.NET Framework Standard 4.5',
    },
    {
      level: undefined,
      name: '.NET Core 3.1',
    },
    {
      level: undefined,
      name: 'Angular 12',
    },
    {
      level: undefined,
      name: 'UWP',
    },
    {
      level: undefined,
      name: 'Android',
    },
    {
      level: undefined,
      name: 'Xamarin',
    },
  ],
  servers: [
    {
      level: undefined,
      name: 'Jenkins',
    },
    {
      level: undefined,
      name: 'Windows Server',
    },
  ],
  coding: [
    {
      level: 2,
      name: 'Java',
    },
    {
      level: 3,
      name: 'C#',
    },
    {
      level: 3,
      name: 'HTML',
    },
    {
      level: 2,
      name: 'Javascript',
    },
    {
      level: 2,
      name: 'SQL',
    },
    {
      level: 2,
      name: 'MySQL',
    },
    {
      level: 2,
      name: 'JirCSS',
    },
    {
      level: 1,
      name: 'Typescript',
    },
    {
      level: 1,
      name: 'C',
    },
    {
      level: 1,
      name: 'PL/SQL',
    },
    {
      level: 1,
      name: 'XAML',
    },
    {
      level: undefined,
      name: 'Dart (Flutter)',
    },
    {
      level: undefined,
      name: 'Android (Java y XML)',
    },
    {
      level: undefined,
      name: 'Android (Kotlin)',
    },
    {
      level: undefined,
      name: 'Python',
    },
    {
      level: undefined,
      name: 'Scala',
    },
    {
      level: undefined,
      name: 'PHP',
    },
    {
      level: undefined,
      name: 'Prolog',
    },
    {
      level: undefined,
      name: 'C++',
    },
    {
      level: undefined,
      name: 'SCSS',
    },
  ],
  enterprise: [
    {
      level: undefined,
      name: 'Microsoft Dynamics 365 CRM (2013, 2016, 9.1)',
    },
    {
      level: undefined,
      name: 'Unified Service Desk (3.3)',
    },
  ],
  office: [
    {
      level: undefined,
      name: 'Microsoft Office (Word, Excel, PowerPoint)',
    },
  ],
  ides: [
    {
      level: undefined,
      name: 'Visual Studio (2017, 2022)',
    },
    {
      level: undefined,
      name: 'VS Code',
    },
    {
      level: undefined,
      name: 'Android Studio',
    },
  ],
  os: [
    {
      level: undefined,
      name: 'Windows (XP, 7, 10)',
    },
    {
      level: undefined,
      name: 'Linux (Ubuntu 14.04)',
    },
  ],
};

export const certificationsConfig: ICertfication[] = [
  {
    name: 'MCSA: Web Applications',
    date: new Date(2018, 10, 29),
    badge:
      'https://images.credly.com/size/680x680/images/887a1be1-7863-4e90-90c9-2bb3a13d9542/MCSA-Web-Applications-2018.png',
    url: 'https://www.credly.com/badges/3ceef6a2-5d97-4220-bfb4-ea25df2f4a83',
  },
  {
    name: 'MCSD: App Builder',
    date: new Date(2018, 11, 7),
    badge:
      'https://images.credly.com/size/680x680/images/a6135ae3-7f96-437e-84d9-d2ded474583c/MCSD-App-Builder-2018.png',
    url: 'https://www.credly.com/badges/82caebeb-d4b9-47c7-ad45-66ea92507688',
  },
  {
    name: 'MCSA: Cloud Platform',
    date: new Date(2018, 11, 13),
    badge:
      'https://images.credly.com/size/680x680/images/0b0fcadf-8a3b-4087-8e36-97a1bdbdd2cd/MCSA-Cloud-Platform-2018.png',
    url: 'https://www.credly.com/badges/ed74d14c-8fb9-455c-bca8-d58eb387dbf8',
  },
  {
    name: 'MCSE: Cloud Platform and Infrastructure',
    date: new Date(2018, 11, 19),
    badge:
      'https://images.credly.com/size/680x680/images/807898ab-9f66-4387-a5e8-b0b59977f8c0/MCSE-Cloud-Platform-Infrastructure-2018.png',
    url: 'https://www.credly.com/badges/323ecf01-ed0c-4c69-b3c2-3495f36987a4',
  },
];

export const personalProjectsConfig: IPersonalProject[] = [
  {
    name: '🎨 RomerART',
    descriptionCode: 'SCREENS.CV.PROJECTS.ROMERART',
    image: undefined,
    url: 'https://miguelromeral.azurewebsites.net/',
    android: undefined,
    microsoft: undefined,
  },
  {
    name: 'ShareTheTrack',
    descriptionCode: 'SCREENS.CV.PROJECTS.SHARETHETRACK',
    image:
      'https://raw.githubusercontent.com/miguelromeral/spotify_app/master/android/app/src/main/res/drawable/ic_launcher_round.png',
    url: 'https://github.com/miguelromeral/spotify_app',
    android:
      'https://play.google.com/store/apps/details?id=es.miguelromeral.spotifyfriends',
    microsoft: undefined,
  },
  {
    name: 'Formula GP',
    descriptionCode: 'SCREENS.CV.PROJECTS.FORMULAGP',
    image:
      'https://raw.githubusercontent.com/miguelromeral/ErgastAPP/master/ErgastAPP/ErgastAPP/ErgastApp.ico',
    url: 'https://github.com/miguelromeral/ErgastAPP',
    android:
      'https://play.google.com/store/apps/details?id=es.miguelromeral.formulagp',
    microsoft:
      'https://play.google.com/store/apps/details?id=es.miguelromeral.formulagp',
  },
  {
    name: 'Secret Manager',
    descriptionCode: 'SCREENS.CV.PROJECTS.SECRETMANAGER',
    image:
      'https://github.com/miguelromeral/SecretManager/raw/master/app/src/main/ic_launcher_sm_v2-web.png',
    url: 'https://github.com/miguelromeral/SecretManager',
    android:
      'https://play.google.com/store/apps/details?id=es.miguelromeral.secretmanager',
    microsoft: undefined,
  },
  {
    name: 'Factory Chaos',
    descriptionCode: 'SCREENS.CV.PROJECTS.FACTORYCHAOS',
    image:
      'https://raw.githubusercontent.com/miguelromeral/FactoryGame/master/Assets/Pictures/FactoryChaosIcon512.png',
    url: 'https://github.com/miguelromeral/FactoryGame',
    android:
      'https://play.google.com/store/apps/details?id=es.miguelromeral.factorychaos',
    microsoft: undefined,
  },
  {
    name: '🏎 F1 2018 Telemetry App',
    descriptionCode: 'SCREENS.CV.PROJECTS.F1TELEMETRY',
    image: undefined,
    url: 'https://github.com/miguelromeral/f12018_telemetry?tab=readme-ov-file',
    android: undefined,
    microsoft: undefined,
  },
];

export const personalStrengthsConfig: IPersonalStrength[] = [
  {
    titleCode: 'STRENGTHS.CAREFULL.TITLE',
    descriptionCode: 'STRENGTHS.CAREFULL.DESCRIPTION',
  },
  {
    titleCode: 'STRENGTHS.ANALYTIC.TITLE',
    descriptionCode: 'STRENGTHS.ANALYTIC.DESCRIPTION',
  },
  {
    titleCode: 'STRENGTHS.RESTORER.TITLE',
    descriptionCode: 'STRENGTHS.RESTORER.DESCRIPTION',
  },
  {
    titleCode: 'STRENGTHS.EQUITY.TITLE',
    descriptionCode: 'STRENGTHS.EQUITY.DESCRIPTION',
  },
  {
    titleCode: 'STRENGTHS.RELATION.TITLE',
    descriptionCode: 'STRENGTHS.RELATION.DESCRIPTION',
  },
];

export const experienceLinksConfig = socialLinksConfig.filter(x => x.showInCV);
