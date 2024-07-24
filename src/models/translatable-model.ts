export class TranslatableModel {
  code: string;
  translatedText: string;

  constructor(code: string) {
    this.code = code;
    this.translatedText = '';
  }

  setTranslatedText(translated: string) {
    this.translatedText = translated;
  }
}
