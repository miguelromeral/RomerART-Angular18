import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LocalStorageConfig } from 'config/settings/local-storage.config';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>( // this.translate.currentLang ||
    environment.language.default
  );
  currentLanguage$: Observable<string> = this.languageSubject.asObservable();

  constructor(
    private translate: TranslateService,
    private localStorageService: LocalStorageService
  ) {}

  init() {
    const languages = environment.language.available.map(lang => lang.code);
    this.translate.addLangs(languages);

    const currentLanguage =
      this.localStorageService.getItem<string>(
        LocalStorageConfig.localStorageKeys.language
      ) ?? environment.language.default;

    // TODO: volver a poner esta configuración cuando se termine
    // let browserLang =
    //   translate.getBrowserLang() || environment.language.default;
    // if (!languages.includes(browserLang)) {
    //   browserLang = environment.language.default;
    // }
    // translate.use(browserLang);

    this.translate.use(currentLanguage);
    this.languageSubject.next(this.translate.currentLang); // Emitir el idioma inicial
  }

  changeLanguage(lang: string) {
    // Change HTML lang attribute
    document.documentElement.lang = lang;
    this.translate.use(lang);
    this.languageSubject.next(lang); // Emitir el nuevo idioma
  }

  translateText(key: string): Observable<string> {
    return this.translate.get(key);
  }
}
