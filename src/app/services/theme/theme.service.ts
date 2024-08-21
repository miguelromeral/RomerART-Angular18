import { Injectable } from '@angular/core';
import {
  darkThemeClassTailwind,
  settingTheme,
  settingThemeValues,
} from 'config/settings/local-storage.config';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>(settingTheme.defaultValue);
  currentTheme$: Observable<string> = this.themeSubject.asObservable();

  constructor(private storage: LocalStorageService) {}

  init() {
    // console.log("Storage Service: "+)
    let currentTheme = this.storage.getItem(settingTheme.localStorageKey);

    if (currentTheme === null) {
      currentTheme = settingTheme.defaultValue;
    }

    this.setTheme(currentTheme);
  }

  setTheme(theme: string): void {
    this.storage.setItem(settingTheme.localStorageKey, theme);

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

    this.themeSubject.next(theme);
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
      this.themeSubject.next(settingThemeValues.system);
    }
  }

  private setDarkTheme() {
    this.themeSubject.next(settingThemeValues.dark);
    window.document.documentElement.classList.add(darkThemeClassTailwind);
  }
  private setLightTheme() {
    this.themeSubject.next(settingThemeValues.light);
    window.document.documentElement.classList.remove(darkThemeClassTailwind);
  }

  getTheme(): string {
    return (
      this.storage.getItem(settingTheme.localStorageKey) ??
      settingTheme.defaultValue
    );
  }

  clearTheme(): void {
    this.storage.removeItem(settingTheme.localStorageKey);
  }
}
