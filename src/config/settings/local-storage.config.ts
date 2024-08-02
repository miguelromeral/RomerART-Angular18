import { ICustomSelectOption } from '@models/inputs/select-option.model';

export const defaultThemeClassTailwind = 'system';
export const darkThemeClassTailwind = 'dark';

export interface ISelectOption<T> {
  localStorageKey: string;
  defaultValue: string;
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

export const settingTheme: ISelectOption<ICustomSelectOption> = {
  defaultValue: 'light',
  localStorageKey: 'theme',
  options: [
    {
      value: defaultThemeClassTailwind,
      labelCode: 'SCREENS.SETTINGS.FORM.THEME.SYSTEM',
      label: '',
    },
    {
      value: 'light',
      labelCode: 'SCREENS.SETTINGS.FORM.THEME.LIGHT',
      label: '',
    },
    {
      value: darkThemeClassTailwind,
      labelCode: 'SCREENS.SETTINGS.FORM.THEME.DARK',
      label: '',
    },
  ],
};
