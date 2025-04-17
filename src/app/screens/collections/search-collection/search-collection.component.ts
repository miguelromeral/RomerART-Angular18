import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawingThumbnailComponent } from '@app/components/art/drawing-thumbnail/drawing-thumbnail.component';
import { DrawingSliderComponent } from '@app/components/collections/drawing-slider/drawing-slider.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { LoadingComponent } from '@app/components/shared/loading/loading.component';
import { TranslatableComponent } from '@app/components/shared/translatable/translatable.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AuthService } from '@app/services/api/auth/auth.service';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { LanguageService } from '@app/services/language/language.service';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { Collection } from '@models/art/collection.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { sortCollectionsByOrder } from '@utils/sorting/sort-utils';
import { finalize, Subscription } from 'rxjs';
import { DrawingScoreComponent } from '../../../components/art/drawing-score/drawing-score.component';
import { CollectionThumbnailComponent } from '@app/components/collections/collection-thumbnail/collection-thumbnail.component';
import { AlertService } from '@app/services/alerts/alert.service';
import { PartialErrorComponent } from '@app/components/shared/errors/partial-error/partial-error.component';

@Component({
  selector: 'app-search-collection',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LoadingComponent,
    CustomTranslatePipe,
    LayoutComponent,
    TranslatableComponent,
    DrawingThumbnailComponent,
    DrawingSliderComponent,
    DrawingScoreComponent,
    CollectionThumbnailComponent,
    PartialErrorComponent,
  ],
  templateUrl: './search-collection.component.html',
  styleUrl: './search-collection.component.scss',
  providers: [CustomTranslatePipe],
})
export class SearchCollectionComponent
  extends LanguageComponent
  implements OnInit
{
  listCollections: Collection[] = [];
  loadingCollections = true;
  errorCollections = false;

  selectedCollection: Collection | undefined;
  selectedQueryParameter = 'details';

  admin = false;

  constructor(
    private drawingService: DrawingService,
    private authService: AuthService,
    private metadataService: MetadataService,
    private languageService: LanguageService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private customTranslate: CustomTranslatePipe
  ) {
    super('SCREENS.COLLECTIONS');
  }

  private intervalSubscription: Subscription | undefined;

  ngOnInit() {
    this.setPageTitle(this.metadataService, this.languageService);
    this.authService.isAdmin().subscribe(isAdmin => {
      this.admin = isAdmin;
    });
    this.loadCollections();
  }

  loadCollections() {
    this.loadingCollections = true;
    this.drawingService.getAllCollections().subscribe({
      next: list => {
        this.errorCollections = false;
        this.listCollections = list
          .filter(c => c.drawingIds.length > 0)
          .sort(sortCollectionsByOrder);
        this.loadingCollections = false;
        this.loadQueryParameters();
      },
      error: () => {
        this.listCollections = [];
        this.errorCollections = true;
        this.alertService.showSilentAlert(
          this.customTranslate,
          'ERRORS.COLLECTION.SEARCH-NOTLOADED'
        );
        this.loadingCollections = false;
      },
    });
  }

  loadQueryParameters() {
    this.route.queryParams.subscribe(params => {
      const selected = params[this.selectedQueryParameter];
      if (selected) {
        this.selectCollection(selected);
      } else {
        if (this.listCollections.length > 0)
          this.selectCollection(this.listCollections[0].id);
      }
    });
  }

  changeQueryParameters() {
    if (this.selectedCollection) {
      const queryParams: Record<string, string> = {};
      queryParams[this.selectedQueryParameter] = this.selectedCollection.id;
      this.router.navigate(['/collections'], { queryParams });
    }
  }

  createNewCollection() {
    this.router.navigate(['/collections/create']);
  }

  editCollection(id: string) {
    this.router.navigate(['/collections/edit/' + id]);
  }

  isCollectionSelected(id: string) {
    return this.selectedCollection?.id === id;
  }

  selectCollection(id: string) {
    this.selectedCollection = this.listCollections.find(x => x.id === id);
    if (!this.selectedCollection) {
      this.selectCollection(this.listCollections[0].id);
    }
    this.setPageTitle(
      this.metadataService,
      this.languageService,
      this.selectedCollection?.name
    );
    this.changeQueryParameters();
  }

  shareCollection() {
    if (navigator.share && this.selectedCollection) {
      const title = this.selectedCollection.name;
      const text = this.customTranslate.transform(this.text('SHARE.TEXT'), {
        title,
      });
      navigator
        .share({
          title: title,
          text: text,
          url: window.location.href,
        })
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(error => {
          console.error('Error sharing', error);
        });
    } else {
      console.error('Web Share API not supported in your browser.');
    }
  }
}
