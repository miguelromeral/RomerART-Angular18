import { Injectable } from '@angular/core';
import { LanguageService } from '../language/language.service';
import { ThemeService } from '../theme/theme.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { settingTranslations } from 'config/settings/local-storage.config';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private translationsSubject = new BehaviorSubject<boolean>(
    settingTranslations.defaultValue
  );
  translations$: Observable<boolean> = this.translationsSubject.asObservable();

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private storage: LocalStorageService
  ) {}

  init() {
    this.initTranslations();
  }

  private initTranslations() {
    const translations = this.storage.getItem(
      settingTranslations.localStorageKey
    );

    if (translations === null) {
      this.setTranslations(settingTranslations.defaultValue);
    } else {
      this.setTranslations(translations === 'true');
    }
  }

  setTranslations(theme: boolean): void {
    this.storage.setItem(settingTranslations.localStorageKey, theme.toString());
    this.translationsSubject.next(theme);
  }
}
