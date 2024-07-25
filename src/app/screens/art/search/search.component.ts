import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { LanguageService } from '@app/services/language/language.service';
import { Drawing } from '@models/art/drawing.model';
import { DrawingThumbnailComponent } from '@app/components/art/drawing-thumbnail/drawing-thumbnail.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { FilterFormComponent } from '@app/components/art/search/filter-form/filter-form.component';

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
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  listDrawings: Drawing[] = [];

  filterFormLoading = true;
  get resultsNotFound(): boolean {
    return this.listDrawings.length === 0;
  }

  constructor(
    private drawingService: DrawingService,
    private languageService: LanguageService
  ) {}

  onFetchedResults(list: Drawing[]) {
    this.listDrawings = list;
  }
  onIsFilterFormLoading(loading: boolean) {
    this.filterFormLoading = loading;
  }
}
