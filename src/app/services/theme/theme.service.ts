import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { SettingSelect } from '@models/settings/settings.model';
import {
  darkThemeClassTailwind,
  settingTheme,
  settingThemeValues,
} from 'config/settings/theme.config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private setting: SettingSelect;

  get currentTheme$() {
    return this.setting.subject;
  }

  constructor(private storage: LocalStorageService) {
    this.setting = new SettingSelect(settingTheme);
  }

  init() {
    let currentTheme = this.storage.getItem(settingTheme.key);

    if (currentTheme === null) {
      currentTheme = settingTheme.defaultValue;
    }

    this.setTheme(currentTheme);
  }

  setTheme(theme: string): void {
    this.storage.setItem(settingTheme.key, theme);

    switch (theme) {
      case settingThemeValues.system:
        this.setSystemTheme();
        return;
      case settingThemeValues.light:
        this.setLightTheme();
        return;
      case settingThemeValues.dark:
        this.setDarkTheme();
        return;
    }
  }

  private setSystemTheme() {
    if (window) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        this.setDarkTheme();
      } else {
        this.setLightTheme();
      }
      this.setting.subject.next(settingThemeValues.system);
    }
  }

  private setDarkTheme() {
    this.setting.subject.next(settingThemeValues.dark);
    window.document.documentElement.classList.add(darkThemeClassTailwind);
  }
  private setLightTheme() {
    this.setting.subject.next(settingThemeValues.light);
    window.document.documentElement.classList.remove(darkThemeClassTailwind);
  }

  getTheme(): string {
    return this.storage.getItem(settingTheme.key) ?? settingTheme.defaultValue;
  }

  clearTheme(): void {
    this.storage.removeItem(settingTheme.key);
  }
}
