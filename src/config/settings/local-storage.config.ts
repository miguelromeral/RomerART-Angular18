import { ICustomSelectOption } from '@models/inputs/select-option.model';
import { ISettingOption } from '@models/settings/settings.model';

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

export const settingTranslations: ISettingOption<boolean> = {
  defaultValue: true,
  key: 'translations',
};

export const settingFilterCount: ISettingOption<boolean> = {
  defaultValue: true,
  key: 'filterCount',
};

export const settingZoomImage: ISettingOption<boolean> = {
  defaultValue: true,
  key: 'zoomImages',
};

export const booleanSettings: ISettingOption<boolean>[] = [
  settingTranslations,
  settingFilterCount,
  settingZoomImage,
];
