import { LanguageService } from '@app/services/language/language.service';
import { MetadataService } from '@app/services/metadata/metadata.service';

export abstract class LanguageComponent {
  basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  setPageTitle(
    metadataService: MetadataService,
    languageService: LanguageService,
    hardcodeText = ''
  ) {
    if (hardcodeText !== '') {
      metadataService.updateTitle(hardcodeText);
    } else {
      languageService.translateText(this.text('TITLE')).subscribe(text => {
        // console.log('Title changed! ' + text);
        metadataService.updateTitle(text);
      });
    }
  }

  text(suffix: string) {
    if (this.basePath === '') {
      return suffix;
    }
    return this.basePath + '.' + suffix;
  }
}
