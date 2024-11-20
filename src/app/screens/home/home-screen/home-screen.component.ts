import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawingThumbnailComponent } from '@app/components/drawings/drawing-thumbnail/drawing-thumbnail.component';
import { PartialErrorComponent } from '@app/components/common/errors/partial-error/partial-error.component';
import { LayoutComponent } from '@app/components/common/layout/layout/layout.component';
import { LoadingComponent } from '@app/components/common/layout/loading/loading.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AlertService } from '@app/services/alerts/alert.service';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { LanguageService } from '@app/services/language/language.service';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { Collection } from '@models/art/collection.model';
import { Drawing } from '@models/art/drawing.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { CollectionDrawingSliderComponent } from '@app/components/collections/collection-drawing-slider/collection-drawing-slider.component';
import {
  ISocialLink,
  socialLinksConfig,
} from 'config/data/social-links.config';
import { homeCollectionConfig } from 'config/data/home.config';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [
    LayoutComponent,
    TranslateModule,
    CustomTranslatePipe,
    DrawingThumbnailComponent,
    CommonModule,
    LoadingComponent,
    NgIf,
    CollectionDrawingSliderComponent,
    PartialErrorComponent,
  ],
  providers: [CustomTranslatePipe],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss',
})
export class HomeScreenComponent extends LanguageComponent implements OnInit {
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
    this.drawingService.getCollectionDetails(homeCollectionConfig).subscribe({
      next: col => {
        this.collection = col;
        this.loadingCollection = false;
      },
      error: () => {
        this.collection = undefined;
        this.alertService.showSilentAlert(
          this.customTranslate,
          'ERRORS.COLLECTION.HOME-NOTLOADED'
        );
        this.errorCollection = true;
        this.loadingCollection = false;
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
