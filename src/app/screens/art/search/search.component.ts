import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Drawing } from '@models/art/drawing.model';
import { DrawingThumbnailComponent } from '@app/components/art/drawing-thumbnail/drawing-thumbnail.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { FilterFormComponent } from '@app/components/art/search/filter-form/filter-form.component';
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

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    DrawingThumbnailComponent,
    LayoutComponent,
    FilterFormComponent,
    TranslateModule,
    CustomTranslatePipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  animations: [filterFormAnimation],
})
export class SearchComponent extends LanguageComponent implements OnInit {
  listDrawings: Drawing[] = [];
  @ViewChild(FilterFormComponent) filterFormComponent!: FilterFormComponent;
  @ViewChild('divImageCounter') divImageCounter!: ElementRef<HTMLDivElement>;

  // showButtonFetchMore = false;
  showButtonFetchMore = true;

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
    // this.nTotalMinutes = this.listDrawings.reduce((accumulator, current) => {
    //   return accumulator + current.time;
    // }, 0);
    // this.nTotalMinutesNotDefined =
    //   this.listDrawings.filter(d => d.time === 0).length > 0;
    // this.nTotalMinutesHuman = `${this.nTotalMinutesNotDefined ? '+' : ''}${}`;
    // this.divImageCounter.nativeElement.classList.add(
    //   this.imageCounterAnimationClass
    // );
  }
  onIsFilterFormLoading(loading: boolean) {
    this.filterFormLoading = loading;
    if (loading && this.divImageCounter?.nativeElement) {
      this.divImageCounter.nativeElement.classList.remove(
        this.imageCounterAnimationClass
      );
    }
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
