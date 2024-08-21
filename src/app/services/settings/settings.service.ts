import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from '../language/language.service';
import { ThemeService } from '../theme/theme.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { booleanSettings } from 'config/settings/local-storage.config';
import { ISettingOption, Setting } from '@models/settings/settings.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private booleanSettings: Setting<boolean>[] = [];

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private storage: LocalStorageService
  ) {
    const bolSet: Setting<boolean>[] = [];
    booleanSettings.forEach(setting => {
      bolSet.push(Setting.getSettingFromInterface(setting));
    });
    this.booleanSettings = bolSet;
  }

  init() {
    this.booleanSettings.forEach(setting => {
      this.initBooleanSetting(setting);
    });
  }

  private getBooleanSetting(key: string): Setting<boolean> | undefined {
    return this.booleanSettings.find(x => x.key === key);
  }

  private initBooleanSetting(setting: Setting<boolean>) {
    const storedValue = this.storage.getItem(setting.key);
    const value =
      storedValue !== null ? storedValue === 'true' : setting.defaultValue;
    this.setBooleanSetting(setting, value);
  }

  setBooleanSetting(opt: ISettingOption<boolean>, value: boolean): void {
    const setting = this.getBooleanSetting(opt.key);
    if (setting) {
      this.storage.setItem(setting.key, value.toString());
      setting.subject.next(value);
    }
  }

  booleanSetting$(setting: ISettingOption<boolean>): Observable<boolean> {
    return this.getBooleanSetting(setting.key)!.subject.asObservable();
  }

  // get translations$() {
  //   return this.getBooleanSetting(settingTranslations.localStorageKey)!.subject;
  // }

  // get filterCount$() {
  //   return this.getBooleanSetting(settingFilterCount.localStorageKey)!.subject;
  // }
  // get zoomImage$() {
  //   return this.getBooleanSetting(settingZoomImage.localStorageKey)!.subject;
  // }
}
