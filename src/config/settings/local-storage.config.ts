import {
  ISettingNumber,
  ISettingSelect,
  ISettingSwitch,
} from '@models/settings/settings.model';
import { settingArtFilterValuesSortBy } from 'config/art/art-filter-form.config';
import { environment } from 'environments/environment';

export const settingTranslations: ISettingSwitch = {
  defaultValue: true,
  inputId: 'iSwitchTranslations',
  type: 'switch',
  icon: 'translate',
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
  icon: 'app-indicator',
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
  icon: 'zoom-in',
  inputId: 'iSwitchZoomImage',
  key: 'zoomImages',
  titleCode: 'SCREENS.SETTINGS.FORM.IMAGE-ZOOM.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.IMAGE-ZOOM.DESCRIPTION',
  showCode: 'SCREENS.SETTINGS.FORM.IMAGE-ZOOM.SHOW',
  hideCode: 'SCREENS.SETTINGS.FORM.IMAGE-ZOOM.HIDE',
  formControlName: 'zoomImage',
};

export const settingFormatDate: ISettingSelect = {
  defaultValue: 'month-yy',
  type: 'select',
  key: 'format-date',
  icon: 'calendar-date',
  formControlName: 'formatDate',
  titleCode: 'SCREENS.SETTINGS.FORM.FORMAT-DATE.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.FORMAT-DATE.DESCRIPTION',
  options: [
    {
      value: 'month-yy',
      label: '',
      labelCode: 'SCREENS.SETTINGS.FORM.FORMAT-DATE.MONTH-YY',
    },
    {
      value: 'mm/yy',
      label: '',
      labelCode: 'SCREENS.SETTINGS.FORM.FORMAT-DATE.MM-YY',
    },
    {
      value: 'yy/mm',
      label: '',
      labelCode: 'SCREENS.SETTINGS.FORM.FORMAT-DATE.YY-MM',
    },
  ],
};

export const settingShowSpotify: ISettingSwitch = {
  defaultValue: true,
  type: 'switch',
  icon: 'spotify',
  inputId: 'iSwitchShowSpotify',
  key: 'showSpotify',
  titleCode: 'SCREENS.SETTINGS.FORM.SHOW-SPOTIFY.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.SHOW-SPOTIFY.DESCRIPTION',
  showCode: 'SCREENS.SETTINGS.FORM.SHOW-SPOTIFY.SHOW',
  hideCode: 'SCREENS.SETTINGS.FORM.SHOW-SPOTIFY.HIDE',
  formControlName: 'showSpotify',
};

export const settingShowKudos: ISettingSwitch = {
  defaultValue: true,
  type: 'switch',
  icon: 'heart',
  inputId: 'iSwitchShowKudos',
  key: 'show-kudos',
  titleCode: 'SCREENS.SETTINGS.FORM.SHOW-KUDOS.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.SHOW-KUDOS.DESCRIPTION',
  showCode: 'SCREENS.SETTINGS.FORM.SHOW-KUDOS.SHOW',
  hideCode: 'SCREENS.SETTINGS.FORM.SHOW-KUDOS.HIDE',
  formControlName: 'showKudos',
};

export const settingShowViews: ISettingSwitch = {
  defaultValue: true,
  type: 'switch',
  icon: 'eye',
  inputId: 'iSwitchShowViews',
  key: 'show-views',
  titleCode: 'SCREENS.SETTINGS.FORM.SHOW-VIEWS.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.SHOW-VIEWS.DESCRIPTION',
  showCode: 'SCREENS.SETTINGS.FORM.SHOW-VIEWS.SHOW',
  hideCode: 'SCREENS.SETTINGS.FORM.SHOW-VIEWS.HIDE',
  formControlName: 'showViews',
};

export const settingShowScoreCritic: ISettingSwitch = {
  defaultValue: true,
  type: 'switch',
  icon: '9-square',
  inputId: 'iSwitchShowScoreCritic',
  key: 'show-score-critic',
  titleCode: 'SCREENS.SETTINGS.FORM.SHOW-SCORE-CRITIC.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.SHOW-SCORE-CRITIC.DESCRIPTION',
  showCode: 'SCREENS.SETTINGS.FORM.SHOW-SCORE-CRITIC.SHOW',
  hideCode: 'SCREENS.SETTINGS.FORM.SHOW-SCORE-CRITIC.HIDE',
  formControlName: 'showScoreCritic',
};

export const settingShowScorePopular: ISettingSwitch = {
  defaultValue: true,
  type: 'switch',
  icon: '9-circle',
  inputId: 'iSwitchShowScorePopular',
  key: 'show-score-popular',
  titleCode: 'SCREENS.SETTINGS.FORM.SHOW-SCORE-POPULAR.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.SHOW-SCORE-POPULAR.DESCRIPTION',
  showCode: 'SCREENS.SETTINGS.FORM.SHOW-SCORE-POPULAR.SHOW',
  hideCode: 'SCREENS.SETTINGS.FORM.SHOW-SCORE-POPULAR.HIDE',
  formControlName: 'showScorePopular',
};

// TODO: ponerlo como dependiente de settingShowZoom
export const settingMaxZoom: ISettingNumber = {
  defaultValue: 2,
  step: 0.1,
  minValue: 1,
  maxValue: 5,
  type: 'number',
  icon: 'zoom-in',
  key: 'max-zoom',
  titleCode: 'SCREENS.SETTINGS.FORM.MAX-ZOOM.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.MAX-ZOOM.DESCRIPTION',
  formControlName: 'maxZoom',
};

export const settingShowFullScreen: ISettingSwitch = {
  defaultValue: true,
  type: 'switch',
  icon: 'fullscreen',
  inputId: 'iSwitchShowFullScreen',
  key: 'show-fullscreen',
  titleCode: 'SCREENS.SETTINGS.FORM.SHOW-FULLSCREEN.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.SHOW-FULLSCREEN.DESCRIPTION',
  showCode: 'SCREENS.SETTINGS.FORM.SHOW-FULLSCREEN.SHOW',
  hideCode: 'SCREENS.SETTINGS.FORM.SHOW-FULLSCREEN.HIDE',
  formControlName: 'showFullScreen',
};

export const settingShowFlipButton: ISettingSwitch = {
  defaultValue: true,
  type: 'switch',
  icon: 'phone-flip',
  inputId: 'iSwitchShowFlipButton',
  key: 'show-flipbutton',
  titleCode: 'SCREENS.SETTINGS.FORM.SHOW-FLIPBUTTON.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.SHOW-FLIPBUTTON.DESCRIPTION',
  showCode: 'SCREENS.SETTINGS.FORM.SHOW-FLIPBUTTON.SHOW',
  hideCode: 'SCREENS.SETTINGS.FORM.SHOW-FLIPBUTTON.HIDE',
  formControlName: 'showFlipButton',
};

export const settingDefaultFilterSortBy: ISettingSelect = {
  defaultValue: environment.forms.drawingFilter.default.sortBy,
  type: 'select',
  key: 'default-fiilter-sort-by',
  icon: 'sort-numeric-down',
  formControlName: 'defaultFilterSortBy',
  titleCode: 'SCREENS.SETTINGS.FORM.DEFAULT-FILTER-SORTBY.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.DEFAULT-FILTER-SORTBY.DESCRIPTION',
  options: settingArtFilterValuesSortBy,
};

export const settingShowReference: ISettingSwitch = {
  defaultValue: true,
  type: 'switch',
  icon: 'image',
  inputId: 'iSwitchShowReference',
  key: 'showReference',
  titleCode: 'SCREENS.SETTINGS.FORM.SHOW-REFERENCE.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.SHOW-REFERENCE.DESCRIPTION',
  showCode: 'SCREENS.SETTINGS.FORM.SHOW-REFERENCE.SHOW',
  hideCode: 'SCREENS.SETTINGS.FORM.SHOW-REFERENCE.HIDE',
  formControlName: 'showReference',
};

export const settingShowTimelapse: ISettingSwitch = {
  defaultValue: true,
  type: 'switch',
  icon: 'play-btn',
  inputId: 'iSwitchShowTimelapse',
  key: 'showTimelapse',
  titleCode: 'SCREENS.SETTINGS.FORM.SHOW-TIMELAPSE.TITLE',
  descriptionCode: 'SCREENS.SETTINGS.FORM.SHOW-TIMELAPSE.DESCRIPTION',
  showCode: 'SCREENS.SETTINGS.FORM.SHOW-TIMELAPSE.SHOW',
  hideCode: 'SCREENS.SETTINGS.FORM.SHOW-TIMELAPSE.HIDE',
  formControlName: 'showTimelapse',
};
