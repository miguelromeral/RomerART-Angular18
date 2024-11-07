import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawingThumbnailComponent } from '@app/components/art/drawing-thumbnail/drawing-thumbnail.component';
import { DrawingSliderComponent } from '@app/components/collections/drawing-slider/drawing-slider.component';
import { PartialErrorComponent } from '@app/components/shared/errors/partial-error/partial-error.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { LoadingComponent } from '@app/components/shared/loading/loading.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AlertService } from '@app/services/alerts/alert.service';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { LanguageService } from '@app/services/language/language.service';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { Collection } from '@models/art/collection.model';
import { Drawing } from '@models/art/drawing.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { homeCollectionConfig } from 'config/data/home.config';
import {
  ISocialLink,
  socialLinksConfig,
} from 'config/data/social-links.config';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutComponent,
    TranslateModule,
    CustomTranslatePipe,
    DrawingThumbnailComponent,
    CommonModule,
    LoadingComponent,
    NgIf,
    DrawingSliderComponent,
    PartialErrorComponent,
  ],
  providers: [CustomTranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends LanguageComponent implements OnInit {
  listDrawings: Drawing[] = [];
  collection: Collection | undefined;
  socialLinks: ISocialLink[] = socialLinksConfig.filter(x => x.showInAbout);
  loadingCollection = true;
  errorCollection = false;

  constructor(
    private metadataService: MetadataService,
    private languageService: LanguageService,
    private drawingService: DrawingService,
    private alertService: AlertService,
    private customTranslate: CustomTranslatePipe,
    private router: Router
  ) {
    super('SCREENS.HOME');
  }

  ngOnInit() {
    this.setPageTitle(this.metadataService, this.languageService);
    this.loadHighlightedCollection();
  }

  loadHighlightedCollection() {
    this.loadingCollection = true;
    this.errorCollection = false;
    this.drawingService
      .getCollectionDetails(homeCollectionConfig)
      .pipe(
        finalize(() => {
          this.loadingCollection = false;
        })
      )
      .subscribe({
        next: col => {
          this.collection = col;
        },
        error: () => {
          this.collection = undefined;
          this.alertService.showSilentAlert(
            this.customTranslate,
            'ERRORS.COLLECTION.HOME-NOTLOADED'
          );
          this.errorCollection = true;
        },
      });
  }

  goToGallery() {
    this.router.navigate(['/art']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }
}
