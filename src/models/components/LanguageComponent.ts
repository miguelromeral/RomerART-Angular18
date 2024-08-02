export abstract class LanguageComponent {
  basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  text(suffix: string) {
    if (this.basePath === '') {
      return suffix;
    }
    return this.basePath + '.' + suffix;
  }
}
