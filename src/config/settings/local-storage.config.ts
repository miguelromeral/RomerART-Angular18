import { ISettingSwitch } from '@models/settings/settings.model';

export const settingTranslations: ISettingSwitch = {
  defaultValue: true,
  inputId: 'iSwitchTranslations',
  type: 'switch',
  key: 'translations',
  titleCode: 'SCREENS.SETTINGS.FORM.TRANSLATIONS.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.TRANSLATIONS.DESCRIPTION',
  showCode: 'SCREENS.SETTINGS.FORM.TRANSLATIONS.SHOW',
  hideCode: 'SCREENS.SETTINGS.FORM.TRANSLATIONS.HIDE',
  formControlName: 'translateFormControl',
};

export const settingFilterCount: ISettingSwitch = {
  defaultValue: true,
  type: 'switch',
  inputId: 'iSwitchFilterCount',
  key: 'filterCount',
  titleCode: 'SCREENS.SETTINGS.FORM.SHOW-FILTER-COUNT.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.SHOW-FILTER-COUNT.DESCRIPTION',
  showCode: 'SCREENS.SETTINGS.FORM.SHOW-FILTER-COUNT.SHOW',
  hideCode: 'SCREENS.SETTINGS.FORM.SHOW-FILTER-COUNT.HIDE',
  formControlName: 'filterCountFormControl',
};

export const settingZoomImage: ISettingSwitch = {
  defaultValue: true,
  type: 'switch',
  inputId: 'iSwitchZoomImage',
  key: 'zoomImages',
  titleCode: 'SCREENS.SETTINGS.FORM.IMAGE-ZOOM.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.IMAGE-ZOOM.DESCRIPTION',
  showCode: 'SCREENS.SETTINGS.FORM.IMAGE-ZOOM.SHOW',
  hideCode: 'SCREENS.SETTINGS.FORM.IMAGE-ZOOM.HIDE',
  formControlName: 'zoomImage',
};
