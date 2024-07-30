import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Drawing } from '@models/art/drawing.model';
import { DrawingThumbnailComponent } from '@app/components/art/drawing-thumbnail/drawing-thumbnail.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { FilterFormComponent } from '@app/components/art/search/filter-form/filter-form.component';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';

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
export class SearchComponent extends LanguageComponent {
  listDrawings: Drawing[] = [];
  @ViewChild(FilterFormComponent) filterFormComponent!: FilterFormComponent;

  showButtonFetchMore = false;
  // showButtonFetchMore = true;

  filterFormLoading = true;
  get resultsNotFound(): boolean {
    return this.listDrawings.length === 0;
  }

  constructor() {
    super('SCREENS.DRAWING-SEARCH');
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
}
