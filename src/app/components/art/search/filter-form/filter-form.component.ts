import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { DrawingFilter } from '@models/art/drawing-filter.model';
import { DrawingThumbnailComponent } from '../../drawing-thumbnail/drawing-thumbnail.component';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { DrawingStyle } from '@models/art/drawing-style.model';
import { DrawingProductType } from '@models/art/drawing-product-type.model';
import { DrawingProduct } from '@models/art/drawing-product.model';
import { DrawingCharacter } from '@models/art/drawing-character.model';
import { DrawingSoftware } from '@models/art/drawing-software.model';
import { DrawingPaperSize } from '@models/art/drawing-paper-size.model';
import { Collection } from '@models/art/collection.model';
import { environment } from 'environments/environment';
import { Drawing } from '@models/art/drawing.model';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { LanguageService } from '@app/services/language/language.service';
import {
  sortByTextAscending,
  sortCharactersByName,
  sortProductsByName,
} from '@utils/sorting/sort-utils';
import {
  ArtFilterFormConfig,
  artFilterValuesSortBy,
  IArtFilterValuesSortBy,
} from 'config/art/art-filter-form.config';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';

@Component({
  selector: 'app-art-search-filter-form',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    NgIf,
    NgClass,
    CommonModule,
    TranslateModule,
    CustomTranslatePipe,
    DrawingThumbnailComponent,
    ReactiveFormsModule,
    LayoutComponent,
  ],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss',
})
export class FilterFormComponent
  extends LanguageComponent
  implements OnInit, OnDestroy
{
  private languageSub: Subscription | undefined;
  queryParamsSubscription: Subscription | undefined;

  /* Communication to parent */
  @Output() fetchedResults = new EventEmitter<Drawing[]>();
  @Output() isLoading = new EventEmitter<boolean>();
  @Output() existsMoreResultsToFetch = new EventEmitter<boolean>();

  /* Filter Form Select */
  listOptionsSortBy: IArtFilterValuesSortBy[] = artFilterValuesSortBy;
  listDrawingStyles: DrawingStyle[] = [];
  listDrawingProductTypes: DrawingProductType[] = [];
  listDrawingProducts: DrawingProduct[] = [];
  listDrawingCharacters: DrawingCharacter[] = [];
  listDrawingModels: string[] = [];
  listDrawingSoftwares: DrawingSoftware[] = [];
  listDrawingPapers: DrawingPaperSize[] = [];
  listCollections: Collection[] = [];
  listDrawings: Drawing[] = [];

  /* Filter Form */
  filterForm = new FormGroup({
    sortBy: new FormControl(environment.forms.drawingFilter.default.sortBy),
    textQuery: new FormControl(
      environment.forms.drawingFilter.default.textQuery
    ),
    type: new FormControl(environment.forms.drawingFilter.default.type),
    productType: new FormControl(
      environment.forms.drawingFilter.default.productType
    ),
    productName: new FormControl(
      environment.forms.drawingFilter.default.productName
    ),
    collection: new FormControl(
      environment.forms.drawingFilter.default.collection
    ),
    characterName: new FormControl(
      environment.forms.drawingFilter.default.characterName
    ),
    modelName: new FormControl(
      environment.forms.drawingFilter.default.modelName
    ),
    software: new FormControl(environment.forms.drawingFilter.default.software),
    paper: new FormControl(environment.forms.drawingFilter.default.paper),
    formSpotify: new FormControl(
      environment.forms.drawingFilter.default.spotify
    ),
    formFavorites: new FormControl(
      environment.forms.drawingFilter.default.favorites
    ),
    pageSize: new FormControl(ArtFilterFormConfig.pagination.resultsPerPage),
    pageNumber: new FormControl(ArtFilterFormConfig.pagination.firstPage),
  });

  constructor(
    private drawingService: DrawingService,
    private languageService: LanguageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super('SCREENS.DRAWING-SEARCH.FORM');
  }

  ngOnInit(): void {
    this.loadSelects();

    this.languageSub = this.languageService.currentLanguage$.subscribe(lang => {
      console.log('Traduciendo cadenas en search... (' + lang + ')');
      this.translateData();
    });

    this.setValuesFromQueryParams();
  }

  requestMoreDrawings() {
    this.filterForm.controls.pageNumber.setValue(
      (this.filterForm.value.pageNumber ?? 0) +
        ArtFilterFormConfig.pagination.firstPage
    );
    this.submitFilter();
  }

  resetFilters() {
    this.filterForm.controls.sortBy.setValue(
      environment.forms.drawingFilter.default.sortBy
    );
    this.filterForm.controls.textQuery.reset();
    this.filterForm.controls.type.setValue(
      environment.forms.drawingFilter.default.type
    );
    this.filterForm.controls.productType.setValue(
      environment.forms.drawingFilter.default.productType
    );
    this.filterForm.controls.productName.setValue(
      environment.forms.drawingFilter.default.productName
    );
    this.filterForm.controls.collection.setValue(
      environment.forms.drawingFilter.default.collection
    );
    this.filterForm.controls.characterName.setValue(
      environment.forms.drawingFilter.default.characterName
    );
    this.filterForm.controls.modelName.setValue(
      environment.forms.drawingFilter.default.modelName
    );
    this.filterForm.controls.software.setValue(
      environment.forms.drawingFilter.default.software
    );
    this.filterForm.controls.paper.setValue(
      environment.forms.drawingFilter.default.paper
    );
    this.filterForm.controls.formSpotify.setValue(
      environment.forms.drawingFilter.default.spotify
    );
    this.filterForm.controls.formFavorites.setValue(
      environment.forms.drawingFilter.default.favorites
    );
    this.filterForm.controls.pageNumber.setValue(1);
    this.listDrawings = [];
    this.changeBasicArtUrl();
  }

  filterControlChange() {
    this.filterForm.controls.pageNumber.setValue(
      ArtFilterFormConfig.pagination.firstPage
    );
    this.submitFilter();
  }

  submitFilter() {
    this.isLoading.emit(true);

    const filters = new DrawingFilter(this.filterForm.value);

    // Prevent resubmitting the form when updating URL query params
    this.queryParamsSubscription?.unsubscribe();
    this.changeBasicArtUrl();
    this.drawingService.filterDrawings(filters).subscribe(results => {
      // if (results.length > 1) {
      //   if (
      //     (this.filterForm.value.pageNumber ??
      //       ArtFilterFormConfig.pagination.firstPage) <= 1
      //   ) {
      this.listDrawings = results;
      // } else {
      //   this.listDrawings = [...this.listDrawings, ...results];
      // }
      this.fetchedResults.emit(this.listDrawings);
      // console.log('Results: ' + results.map(d => d.id));
      // }
      // this.existsMoreResultsToFetch.emit(
      //   results.length === ArtFilterFormConfig.pagination.resultsPerPage
      // );

      this.isLoading.emit(false);
    });
  }

  loadSelects() {
    this.listDrawingStyles = this.drawingService.getDrawingStyles();
    this.listDrawingProductTypes = this.drawingService.getDrawingProductTypes();
    this.drawingService.getDrawingProducts().subscribe(list => {
      if (list) {
        // TODO: hacer que esto funcione
        this.listDrawingProducts = list.sort(sortProductsByName);
      }
    });
    this.drawingService.getDrawingCharacters().subscribe(list => {
      if (list) {
        this.listDrawingCharacters = list.sort(sortCharactersByName);
      }
    });
    this.drawingService.getDrawingModels().subscribe(list => {
      if (list) {
        this.listDrawingModels = list.sort(sortByTextAscending);
      }
    });
    this.listDrawingSoftwares = this.drawingService.getDrawingSoftwares();
    this.listDrawingPapers = this.drawingService.getDrawingPaperSizes();
    this.drawingService.getAllCollections().subscribe(list => {
      this.listCollections = list;
    });
  }

  translateData() {
    if (this.listDrawingStyles) {
      this.listDrawingStyles.forEach(style => {
        this.languageService.translateText(style.code).subscribe(newText => {
          style.setTranslatedText(newText);
        });
      });
    }

    if (this.listDrawingProductTypes) {
      this.listDrawingProductTypes.forEach(type => {
        this.languageService.translateText(type.code).subscribe(newText => {
          // console.log(type.code + ' --> ' + newText);
          type.setTranslatedText(newText);
        });
      });
    }
  }

  getEmojiFromProductType(id: number) {
    const results = this.listDrawingProductTypes.filter(
      product => product.id === id
    );
    if (results.length !== 1) {
      return '';
    }

    this.listDrawingProducts.sort((a: DrawingProduct, b: DrawingProduct) => {
      return a.productName.localeCompare(b.productName);
    });

    return results[0].emoji;
  }

  capturarEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      // this.submitFilter();
    }
  }

  changeBasicArtUrl() {
    const filters = new DrawingFilter(this.filterForm.value);
    const queryParams: Record<string, string> = {};

    // TODO: arreglar que el sortby como queryparams no funciona bien
    // this.changeBasicArtUrlParameter(
    //   queryParams,
    //   ArtFilterFormConfig.queryParamsNames.sortBy,
    //   filters,
    //   'sortBy'
    // );
    this.changeBasicArtUrlParameter(
      queryParams,
      ArtFilterFormConfig.queryParamsNames.textQuery,
      filters,
      'textQuery'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      ArtFilterFormConfig.queryParamsNames.type,
      filters,
      'type'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      ArtFilterFormConfig.queryParamsNames.productType,
      filters,
      'productType'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      ArtFilterFormConfig.queryParamsNames.product,
      filters,
      'productName'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      ArtFilterFormConfig.queryParamsNames.collection,
      filters,
      'collection'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      ArtFilterFormConfig.queryParamsNames.character,
      filters,
      'characterName'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      ArtFilterFormConfig.queryParamsNames.modelName,
      filters,
      'modelName'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      ArtFilterFormConfig.queryParamsNames.software,
      filters,
      'software'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      ArtFilterFormConfig.queryParamsNames.paper,
      filters,
      'paper'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      ArtFilterFormConfig.queryParamsNames.spotify,
      filters,
      'formSpotify'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      ArtFilterFormConfig.queryParamsNames.favorites,
      filters,
      'formFavorites'
    );
    this.router.navigate(['/art'], { queryParams });
  }

  changeBasicArtUrlParameter(
    queryParams: Record<string, string>,
    queryName: string,
    filters: DrawingFilter,
    filterName: string
  ): Record<string, string> {
    const value = filters[filterName as keyof DrawingFilter]?.toString();
    // console.log(filterName + ' --> ' + value);
    if (
      value !== '' &&
      value !== '-1' &&
      value !== '0' &&
      value !== 'null' &&
      value !== null &&
      value !== 'undefined' &&
      value !== undefined &&
      value !== 'false'
    ) {
      queryParams[queryName] = value || '';
    }
    return queryParams;
  }

  setValuesFromQueryParams() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.textQuery,
        params[ArtFilterFormConfig.queryParamsNames.textQuery]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.type,
        params[ArtFilterFormConfig.queryParamsNames.type]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.productType,
        params[ArtFilterFormConfig.queryParamsNames.productType]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.productName,
        params[ArtFilterFormConfig.queryParamsNames.product]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.collection,
        params[ArtFilterFormConfig.queryParamsNames.collection]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.characterName,
        params[ArtFilterFormConfig.queryParamsNames.character]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.modelName,
        params[ArtFilterFormConfig.queryParamsNames.modelName]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.software,
        params[ArtFilterFormConfig.queryParamsNames.software]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.paper,
        params[ArtFilterFormConfig.queryParamsNames.paper]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.formSpotify,
        params[ArtFilterFormConfig.queryParamsNames.spotify]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.formFavorites,
        params[ArtFilterFormConfig.queryParamsNames.favorites]
      );
      // console.log('Filtering from query params');
      this.submitFilter();
    });
  }
  setValueFromQueryParamsIntoForm(formControl: FormControl, parameter: string) {
    if (
      parameter !== null &&
      parameter !== undefined &&
      parameter !== '' &&
      parameter !== 'false'
    ) {
      formControl.setValue(parameter);
    }
  }

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
  }
}
