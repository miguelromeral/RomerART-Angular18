import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { settingLanguage } from 'config/settings/local-storage.config';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>(
    settingLanguage.defaultValue
  );
  currentLanguage$: Observable<string> = this.languageSubject.asObservable();

  constructor(
    private translate: TranslateService,
    private localStorageService: LocalStorageService
  ) {}

  init() {
    const languages = settingLanguage.options.map(lang => lang.code);
    this.translate.addLangs(languages);

    let currentLanguage = this.localStorageService.getItem(
      settingLanguage.localStorageKey
    );

    if (currentLanguage === null) {
      currentLanguage =
        this.translate.getBrowserLang() || settingLanguage.defaultValue;
      if (!languages.includes(currentLanguage)) {
        currentLanguage = settingLanguage.defaultValue;
      }
    }

    this.changeLanguage(currentLanguage);
  }

  changeLanguage(lang: string) {
    // Change HTML lang attribute
    document.documentElement.lang = lang;
    this.translate.use(lang);
    this.languageSubject.next(lang); // Emitir el nuevo idioma
    this.localStorageService.setItem(settingLanguage.localStorageKey, lang);
  }

  translateText(key: string): Observable<string> {
    return this.translate.get(key);
  }
}
