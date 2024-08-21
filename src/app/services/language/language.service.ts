import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { SettingSelect } from '@models/settings/settings.model';
import { settingLanguage } from 'config/settings/language.config';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private setting: SettingSelect;

  get currentLanguage$() {
    return this.setting.subject;
  }

  constructor(
    private translate: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    this.setting = new SettingSelect(settingLanguage);
  }

  init() {
    const languages = settingLanguage.options.map(lang => lang.value);
    this.translate.addLangs(languages);

    let currentLanguage = this.localStorageService.getItem(settingLanguage.key);

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
    this.setting.subject.next(lang); // Emitir el nuevo idioma
    this.localStorageService.setItem(settingLanguage.key, lang);
  }

  translateText(key: string): Observable<string> {
    return this.translate.get(key);
  }
}
