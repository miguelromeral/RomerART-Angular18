import { Injectable } from '@angular/core';
import { LanguageService } from '../language/language.service';
import { ThemeService } from '../theme/theme.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  settingFilterCount,
  settingTranslations,
} from 'config/settings/local-storage.config';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private translationsSubject = new BehaviorSubject<boolean>(
    settingTranslations.defaultValue
  );
  translations$: Observable<boolean> = this.translationsSubject.asObservable();

  private filterCountSubject = new BehaviorSubject<boolean>(
    settingFilterCount.defaultValue
  );
  filterCount$: Observable<boolean> = this.filterCountSubject.asObservable();

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private storage: LocalStorageService
  ) {}

  init() {
    this.initTranslations();
    this.initFilterCount();
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

  private initFilterCount() {
    const filterCount = this.storage.getItem(
      settingFilterCount.localStorageKey
    );

    if (filterCount === null) {
      this.setFilterCount(settingFilterCount.defaultValue);
    } else {
      this.setFilterCount(filterCount === 'true');
    }
  }

  setFilterCount(show: boolean): void {
    this.storage.setItem(settingFilterCount.localStorageKey, show.toString());
    this.filterCountSubject.next(show);
  }
}
