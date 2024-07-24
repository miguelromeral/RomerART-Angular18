export class Language {
  code: string;
  text: string;

  constructor(data: Partial<Language> = {}) {
    this.code = data.code || '';
    this.text = data.text || '';
  }
}
