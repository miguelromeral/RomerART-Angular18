import { ISetting } from '@models/settings/settings.model';

export const settingTranslations: ISetting<boolean> = {
  defaultValue: true,
  key: 'translations',
};

export const settingFilterCount: ISetting<boolean> = {
  defaultValue: true,
  key: 'filterCount',
};

export const settingZoomImage: ISetting<boolean> = {
  defaultValue: true,
  key: 'zoomImages',
};

export const booleanSettings: ISetting<boolean>[] = [
  settingTranslations,
  settingFilterCount,
  settingZoomImage,
];
