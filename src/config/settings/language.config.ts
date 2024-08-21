import { ISettingSelect } from '@models/settings/settings.model';

export const settingLanguage: ISettingSelect = {
  defaultValue: 'es',
  key: 'lang',
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
