import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
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
})
export class SearchComponent extends LanguageComponent implements OnInit {
  listDrawings: Drawing[] = [];
  @ViewChild(FilterFormComponent) filterFormComponent!: FilterFormComponent;

  showButtonFetchMore = false;
  // showButtonFetchMore = true;

  filterFormLoading = true;
  get resultsNotFound(): boolean {
    return this.listDrawings.length === 0;
  }

  admin = false;
  showFilters = false;

  constructor(
    private metadataService: MetadataService,
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router
  ) {
    super('SCREENS.DRAWING-SEARCH');
  }

  ngOnInit() {
    this.languageService.translateText(this.text('TITLE')).subscribe(text => {
      this.metadataService.updateTitle(text);
    });
    this.authService.loggedUser$.subscribe(user => {
      this.admin = user?.role === 'admin';
    });
  }

  showHideFilters() {
    this.showFilters = !this.showFilters;
  }

  onFetchedResults(list: Drawing[]) {
    this.listDrawings = list;
  }
  onIsFilterFormLoading(loading: boolean) {
    this.filterFormLoading = loading;
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
