import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>( // this.translate.currentLang ||
    environment.language.default
  );
  currentLanguage$: Observable<string> = this.languageSubject.asObservable();

  constructor(private translate: TranslateService) {
    const languages = environment.language.available.map(lang => lang.code);
    translate.addLangs(languages);
    let browserLang =
      translate.getBrowserLang() || environment.language.default;
    if (!languages.includes(browserLang)) {
      browserLang = environment.language.default;
    }
    translate.use(browserLang);
    this.languageSubject.next(this.translate.currentLang); // Emitir el idioma inicial
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.languageSubject.next(lang); // Emitir el nuevo idioma
  }

  translateText(key: string): Observable<string> {
    return this.translate.get(key);
  }
}
