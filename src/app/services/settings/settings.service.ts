import { Injectable } from '@angular/core';
import { LanguageService } from '../language/language.service';
import { ThemeService } from '../theme/theme.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  settingFilterCount,
  settingTranslations,
  settingZoomImage,
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

  private zoomImageSubject = new BehaviorSubject<boolean>(
    settingZoomImage.defaultValue
  );
  zoomImage$: Observable<boolean> = this.zoomImageSubject.asObservable();

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private storage: LocalStorageService
  ) {}

  init() {
    this.initTranslations();
    this.initFilterCount();
    this.initZoomImage();
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

  private initZoomImage() {
    const value = this.storage.getItem(settingZoomImage.localStorageKey);

    if (value === null) {
      this.setZoomImage(settingZoomImage.defaultValue);
    } else {
      this.setZoomImage(value === 'true');
    }
  }

  setZoomImage(show: boolean): void {
    this.storage.setItem(settingZoomImage.localStorageKey, show.toString());
    this.zoomImageSubject.next(show);
  }
}
