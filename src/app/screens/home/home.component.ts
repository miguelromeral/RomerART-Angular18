import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawingThumbnailComponent } from '@app/components/art/drawing-thumbnail/drawing-thumbnail.component';
import { DrawingSliderComponent } from '@app/components/collections/drawing-slider/drawing-slider.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { LoadingComponent } from '@app/components/shared/loading/loading.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends LanguageComponent implements OnInit {
  listDrawings: Drawing[] = [];
  collection: Collection | undefined;
  socialLinks: ISocialLink[] = socialLinksConfig.filter(x => x.showInAbout);
  loadingCollection = true;

  constructor(
    private metadataService: MetadataService,
    private languageService: LanguageService,
    private drawingService: DrawingService,
    private router: Router
  ) {
    super('SCREENS.HOME');
  }

  ngOnInit() {
    this.setPageTitle(this.metadataService, this.languageService);
    this.drawingService
      .getCollectionDetails(homeCollectionConfig)
      .subscribe(col => {
        this.collection = col;
        this.loadingCollection = false;
      });
  }

  goToGallery() {
    this.router.navigate(['/art']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }
}
