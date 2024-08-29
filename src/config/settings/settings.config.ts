import {
  settingFilterCount,
  settingFormatDate,
  settingShowSpotify,
  settingTranslations,
  settingZoomImage,
} from './local-storage.config';
import { SettingSelect, SettingSwitch } from '@models/settings/settings.model';
import { settingLanguage } from './language.config';
import { settingTheme } from './theme.config';
import { SettingSection } from '@models/settings/settings-sections.model';

export const settingsConfig: SettingSection[] = [
  new SettingSection({
    icon: 'universal-access-circle',
    titleCode: 'SCREENS.SETTINGS.SECTIONS.ACCESSIBILITY',
    settings: [new SettingSelect(settingTheme)],
  }),
  new SettingSection({
    icon: 'sliders',
    titleCode: 'SCREENS.SETTINGS.SECTIONS.CUSTOMIZATION',
    settings: [new SettingSelect(settingFormatDate)],
  }),
  new SettingSection({
    icon: 'translate',
    titleCode: 'SCREENS.SETTINGS.SECTIONS.LANGUAGE',
    settings: [
      new SettingSelect(settingLanguage),
      new SettingSwitch(settingTranslations),
    ],
  }),
  new SettingSection({
    icon: 'easel',
    titleCode: 'SCREENS.SETTINGS.SECTIONS.DRAWINGS',
    settings: [
      new SettingSwitch(settingFilterCount),
      new SettingSwitch(settingZoomImage),
      new SettingSwitch(settingShowSpotify),
    ],
  }),
];
