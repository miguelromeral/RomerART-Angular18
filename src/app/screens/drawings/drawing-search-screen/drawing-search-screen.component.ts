import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Drawing } from '@models/art/drawing.model';
import { DrawingThumbnailComponent } from '@app/components/drawings/drawing-thumbnail/drawing-thumbnail.component';
import { LayoutComponent } from '@app/components/common/layout/layout/layout.component';
import { DrawingFilterFormComponent } from '@app/components/drawings/drawing-filter-form/drawing-filter-form.component';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { LanguageService } from '@app/services/language/language.service';
import { AuthService } from '@app/services/api/auth/auth.service';
import { Router } from '@angular/router';
import { filterFormAnimation } from '@app/animations/art/filter-form.animations';
import { getHumanTimeFromMinutes } from '@utils/customization/text-utils';
import { FilterResultsDrawing } from '@models/responses/filter-drawing-response.model';
import { LoadingComponent } from '@app/components/common/layout/loading/loading.component';
import { ArtFilterFormConfig } from '../../../../config/art/art-filter-form.config';
import { artGalleryAnimation } from '@app/animations/art/drawing-thumbnail.animation';
import { PartialErrorComponent } from '@app/components/common/errors/partial-error/partial-error.component';

@Component({
  selector: 'app-drawing-search-screen',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    DrawingThumbnailComponent,
    LayoutComponent,
    DrawingFilterFormComponent,
    TranslateModule,
    CustomTranslatePipe,
    LoadingComponent,
    PartialErrorComponent,
  ],
  templateUrl: './drawing-search-screen.component.html',
  styleUrl: './drawing-search-screen.component.scss',
  animations: [filterFormAnimation, artGalleryAnimation],
})
export class DrawingSearchScreenComponent
  extends LanguageComponent
  implements OnInit
{
  listDrawings: Drawing[] = [];
  @ViewChild(DrawingFilterFormComponent)
  filterFormComponent!: DrawingFilterFormComponent;
  @ViewChild('divImageCounter') divImageCounter!: ElementRef<HTMLDivElement>;

  // showButtonFetchMore = false;
  showButtonFetchMore = true;

  filterFormError = false;
  filterFormLoading = true;
  get resultsNotFound(): boolean {
    if (this.listDrawings) {
      return this.listDrawings.length === 0;
    } else {
      return true;
    }
  }
  get resultsLength(): number {
    if (this.listDrawings) {
      return this.listDrawings.length;
    } else {
      return 0;
    }
  }
  imageCounterAnimationClass = 'image-count-animation';

  admin = false;
  showFilters = false;
  nTotalMinutesHuman = '';
  lastFilterResults: FilterResultsDrawing | undefined;
  placeholderResults = ArtFilterFormConfig.pagination.resultsPerPage;
  placeholderDrawings = Array(this.placeholderResults)
    .fill(0)
    .map((_, i) => i + 1);

  constructor(
    private metadataService: MetadataService,
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router
  ) {
    super('SCREENS.DRAWING-SEARCH');
  }

  ngOnInit() {
    this.setPageTitle(this.metadataService, this.languageService);
    this.authService.loggedUser$.subscribe(user => {
      this.admin = user?.role === 'admin';
    });
  }

  showHideFilters() {
    this.showFilters = !this.showFilters;
  }

  onFetchedResults(results: FilterResultsDrawing) {
    this.lastFilterResults = results;
    const list = results.totalDrawings;
    this.listDrawings = list;
    this.nTotalMinutesHuman = getHumanTimeFromMinutes(results.totalTime);
  }
  onIsFilterFormLoading(loading: boolean) {
    this.filterFormLoading = loading;
    if (loading && this.divImageCounter?.nativeElement) {
      this.divImageCounter.nativeElement.classList.remove(
        this.imageCounterAnimationClass
      );
    }
  }
  onIsFilterFormError(error: boolean) {
    this.filterFormError = error;
  }

  requestDrawingsAfterError() {
    this.filterFormComponent.requestDrawingsAfterError();
  }

  requestMoreDrawings() {
    this.filterFormComponent.requestMoreDrawings();
  }

  existsMoreResultsToFetch(moreFound: boolean) {
    this.showButtonFetchMore = moreFound;
  }

  createNewDrawing() {
    this.router.navigate(['/art/create']);
  }
}
