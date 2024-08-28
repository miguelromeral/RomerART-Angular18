import { settingLanguage } from 'config/settings/language.config';
import { of, BehaviorSubject } from 'rxjs';

export class MockLanguageService {
  private mockLangSubject = new BehaviorSubject<string>(
    settingLanguage.defaultValue
  ); // Usa BehaviorSubject para simular un observable

  // Simula el observable que emite el idioma actual
  get currentLanguage$() {
    return this.mockLangSubject.asObservable();
  }

  // Simula la inicialización del servicio
  init() {
    // Simula alguna inicialización si es necesario
  }

  // Simula el cambio de idioma
  changeLanguage(lang: string) {
    this.mockLangSubject.next(lang); // Emite el nuevo idioma
  }

  // Simula la traducción de texto
  translateText(key: string) {
    return of(`translated-${key}`); // Devuelve un observable con un texto simulado
  }
}
