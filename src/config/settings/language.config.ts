import { ISettingSelect } from '@models/settings/settings.model';

export const settingLanguage: ISettingSelect = {
  defaultValue: 'es',
  type: 'select',
  key: 'lang',
  formControlName: 'langFormControl',
  titleCode: 'SCREENS.SETTINGS.FORM.CHANGE-LANGUAGE.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.CHANGE-LANGUAGE.DESCRIPTION',
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
