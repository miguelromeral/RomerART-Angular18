export abstract class LanguageComponent {
  basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  text(suffix: string) {
    return this.basePath + '.' + suffix;
  }
}
