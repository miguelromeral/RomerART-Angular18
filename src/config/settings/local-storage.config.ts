import { ICustomSelectOption } from '@models/inputs/select-option.model';

export interface ILocalStorageOption {
  localStorageKey: string;
  defaultValue: string;
}

export interface ISelectOption<T> extends ILocalStorageOption {
  options: T[];
}

export const settingLanguage: ISelectOption<ICustomSelectOption> = {
  defaultValue: 'es',
  localStorageKey: 'lang',
  options: [
    {
      value: 'es',
      label: 'Español',
      labelCode: '',
    },
    {
      value: 'en',
      label: 'English',
      labelCode: '',
    },
  ],
};

export const darkThemeClassTailwind = 'dark';

export const settingThemeValues = {
  system: 'system',
  light: 'light',
  dark: darkThemeClassTailwind,
};

export const settingTheme: ISelectOption<ICustomSelectOption> = {
  defaultValue: settingThemeValues.system,
  localStorageKey: 'theme',
  options: [
    {
      value: settingThemeValues.system,
      labelCode: 'SCREENS.SETTINGS.FORM.THEME.SYSTEM',
      label: '',
    },
    {
      value: settingThemeValues.light,
      labelCode: 'SCREENS.SETTINGS.FORM.THEME.LIGHT',
      label: '',
    },
    {
      value: settingThemeValues.dark,
      labelCode: 'SCREENS.SETTINGS.FORM.THEME.DARK',
      label: '',
    },
  ],
};

export const settingTranslations = {
  defaultValue: true,
  localStorageKey: 'translations',
};

export const settingFilterCount = {
  defaultValue: true,
  localStorageKey: 'filterCount',
};

export const settingZoomImage = {
  defaultValue: true,
  localStorageKey: 'zoomImages',
};
