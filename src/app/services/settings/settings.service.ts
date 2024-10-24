import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from '../language/language.service';
import { ThemeService } from '../theme/theme.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import {
  ISettingNumber,
  ISettingSelect,
  ISettingSwitch,
  Setting,
  SettingNumber,
  SettingSelect,
  SettingSwitch,
} from '@models/settings/settings.model';
import { SettingSection } from '@models/settings/settings-sections.model';
import { settingsConfig } from 'config/settings/settings.config';
import { FormControl, FormGroup } from '@angular/forms';
import { settingLanguage } from 'config/settings/language.config';
import { settingTheme } from 'config/settings/theme.config';
import { SettingNotFoundError } from '@app/errors/settings/setting-not-found.error';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settings: SettingSection[] = settingsConfig;

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private storage: LocalStorageService
  ) {}

  init() {
    this.settings.forEach(section => {
      section.settings.forEach(setting => {
        if (this.isSettingSwitch(setting)) {
          this.initBooleanSetting(setting);
        }
        if (this.isSettingSelect(setting)) {
          this.initSelectSetting(setting);
        }
        if (this.isSettingNumber(setting)) {
          this.initNumberSetting(setting);
        }
      });
    });
  }

  getSettings() {
    return this.settings;
  }

  // setFormControls(fg: FormGroup) {
  //   this.settings.forEach(section => {
  //     section.settings.forEach(setting => {
  //       if (fg.contains(setting.key)) {
  //         setting.formControlName = setting.key;
  //         const formControl = fg.get(setting.key) as FormControl;
  //         setting.setFormControl(formControl);
  //       }
  //     });
  //   });
  // }

  private getBooleanSetting(key: string): SettingSwitch | undefined {
    const allSettings: Setting[] = [];
    this.settings.forEach(section => {
      allSettings.push(...section.settings);
    });
    const found = allSettings.find(x => x.key === key);
    if (found && this.isSettingSwitch(found)) {
      return found;
    }
    return undefined;
  }

  private getSelectSetting(key: string): SettingSelect | undefined {
    const allSettings: Setting[] = [];
    this.settings.forEach(section => {
      allSettings.push(...section.settings);
    });
    const found = allSettings.find(x => x.key === key);
    if (found && this.isSettingSelect(found)) {
      return found;
    }
    return undefined;
  }

  private getNumberSetting(key: string): SettingNumber | undefined {
    const allSettings: Setting[] = [];
    this.settings.forEach(section => {
      allSettings.push(...section.settings);
    });
    const found = allSettings.find(x => x.key === key);
    if (found && this.isSettingNumber(found)) {
      return found;
    }
    return undefined;
  }

  private initBooleanSetting(setting: SettingSwitch) {
    const storedValue = this.storage.getItem(setting.key);
    const value =
      storedValue !== null ? storedValue === 'true' : setting.defaultValue;
    this.setBooleanSetting(setting.key, value);
  }

  private initSelectSetting(setting: SettingSelect) {
    const value = this.storage.getItem(setting.key);
    switch (setting.key) {
      case settingLanguage.key:
        {
          this.languageService.init();
        }
        break;
      case settingTheme.key:
        {
          this.themeService.init();
        }
        break;
    }
    this.setSelectSetting(setting.key, value ?? setting.defaultValue);
  }

  private initNumberSetting(setting: SettingNumber) {
    const storedValue = this.storage.getItem(setting.key);
    const value = storedValue ? parseFloat(storedValue) : setting.defaultValue;
    this.setNumberSetting(setting.key, value);
  }

  setBooleanSetting(key: string, value: boolean): void {
    const setting = this.getBooleanSetting(key);
    this.storage.setItem(key, value.toString());
    setting?.subject.next(value);
  }

  setSelectSetting(key: string, value: string) {
    const setting = this.getSelectSetting(key);
    switch (key) {
      case settingLanguage.key:
        this.languageService.changeLanguage(value);
        break;
      case settingTheme.key:
        this.themeService.setTheme(value);
        break;
      default:
        this.storage.setItem(key, value);
    }
    setting?.subject.next(value);
  }

  setNumberSetting(key: string, value: number): void {
    const setting = this.getNumberSetting(key);
    if (setting?.minValue && value < setting?.minValue)
      value = setting?.minValue;
    if (setting?.maxValue && value > setting.maxValue) value = setting.maxValue;
    this.storage.setItem(key, value.toString());
    setting?.subject.next(value);
  }

  booleanSetting$(setting: ISettingSwitch): Observable<boolean> {
    return this.getBooleanSetting(setting.key)!.subject.asObservable();
  }
  booleanSettingValue(setting: ISettingSwitch): boolean {
    const settingFound = this.getBooleanSetting(setting.key);
    if (!settingFound) {
      throw new SettingNotFoundError(setting.key);
    }
    return settingFound.subject.getValue();
  }

  selectSetting$(setting: ISettingSelect): Observable<string> {
    return this.getSelectSetting(setting.key)!.subject.asObservable();
  }
  selectSettingValue(setting: ISettingSelect): string {
    const settingFound = this.getSelectSetting(setting.key);
    if (!settingFound) {
      throw new SettingNotFoundError(setting.key);
    }
    return settingFound.subject.getValue();
  }

  numberSetting$(setting: ISettingNumber): Observable<number> {
    return this.getNumberSetting(setting.key)!.subject.asObservable();
  }
  numberSettingValue(setting: ISettingNumber): number {
    const settingFound = this.getNumberSetting(setting.key);
    if (!settingFound) {
      throw new SettingNotFoundError(setting.key);
    }
    return settingFound.subject.getValue();
  }

  isSettingSwitch(setting: Setting): setting is SettingSwitch {
    return setting instanceof SettingSwitch;
  }

  isSettingSelect(setting: Setting): setting is SettingSelect {
    return setting instanceof SettingSelect;
  }

  isSettingNumber(setting: Setting): setting is SettingNumber {
    return setting instanceof SettingNumber;
  }
}
