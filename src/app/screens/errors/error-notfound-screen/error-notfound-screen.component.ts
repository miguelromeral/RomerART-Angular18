import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '@app/components/common/layout/layout/layout.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageService } from '@app/services/language/language.service';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-error-notfound-screen',
  standalone: true,
  imports: [LayoutComponent, TranslateModule, CustomTranslatePipe],
  templateUrl: './error-notfound-screen.component.html',
  styleUrl: './error-notfound-screen.component.scss',
})
export class ErrorNotfoundScreenComponent
  extends LanguageComponent
  implements OnInit
{
  constructor(
    private languageService: LanguageService,
    private metadataService: MetadataService
  ) {
    super('SCREENS.NOT-FOUND');
  }

  ngOnInit() {
    this.languageService.translateText(this.text('TITLE')).subscribe(text => {
      this.metadataService.updateTitle(text);
    });
  }
}
