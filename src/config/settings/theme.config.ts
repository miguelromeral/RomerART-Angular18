import { ISettingSelect } from '@models/settings/settings.model';

export const darkThemeClassTailwind = 'dark';

export const settingThemeValues = {
  system: 'system',
  light: 'light',
  dark: darkThemeClassTailwind,
};

export const settingTheme: ISettingSelect = {
  defaultValue: settingThemeValues.system,
  key: 'theme',
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
