import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from '@app/components/common/layout/layout/layout.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageService } from '@app/services/language/language.service';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-index-screen',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CustomTranslatePipe,
    LayoutComponent,
  ],
  templateUrl: './about-index-screen.component.html',
  styleUrl: './about-index-screen.component.scss',
})
export class AboutIndexScreenComponent extends LanguageComponent {
  constructor(
    private router: Router,
    private metadataService: MetadataService,
    private languageService: LanguageService
  ) {
    super('SCREENS.ABOUT.WELCOME');
    this.setPageTitle(metadataService, languageService);
  }

  goToAbout() {
    this.router.navigate(['/about/me']);
  }

  goToCV() {
    this.router.navigate(['/about/hire']);
  }
}
