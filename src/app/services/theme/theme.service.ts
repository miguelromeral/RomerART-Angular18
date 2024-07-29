import { Injectable } from '@angular/core';
import { StorageService } from '@ng-web-apis/storage';
import {
  darkThemeClassTailwind,
  settingTheme,
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
    console.log('Changing theme: ' + theme);
    this.storage.setItem(settingTheme.localStorageKey, theme);
    if (theme === darkThemeClassTailwind) {
      window.document.documentElement.classList.add(darkThemeClassTailwind);
    } else {
      window.document.documentElement.classList.remove(darkThemeClassTailwind);
    }

    this.themeSubject.next(theme);
  }

  getTheme(): string | null {
    return this.storage.getItem(settingTheme.localStorageKey);
  }

  clearTheme(): void {
    this.storage.removeItem(settingTheme.localStorageKey);
  }
}
