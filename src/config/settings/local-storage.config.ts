export const darkThemeClassTailwind = 'dark';

export interface IAvailableLanguage {
  code: string;
  text: string;
}

export interface ITailwindTheme {
  value: string;
  textCode: string;
}

export interface ISelectOption<T> {
  localStorageKey: string;
  defaultValue: string;
  options: T[];
}

export const settingLanguage: ISelectOption<IAvailableLanguage> = {
  defaultValue: 'es',
  localStorageKey: 'lang',
  options: [
    {
      code: 'es',
      text: 'Español',
    },
    {
      code: 'en',
      text: 'English',
    },
  ],
};

export const settingTheme: ISelectOption<ITailwindTheme> = {
  defaultValue: 'light',
  localStorageKey: 'theme',
  options: [
    {
      value: 'light',
      textCode: 'FORM.THEME.LIGHT',
    },

    {
      value: darkThemeClassTailwind,
      textCode: 'FORM.THEME.DARK',
    },
  ],
};
