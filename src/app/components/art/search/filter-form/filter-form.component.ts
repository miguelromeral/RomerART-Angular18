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
import { LoadingComponent } from '@app/components/shared/loading/loading.component';
import { SwitchComponent } from '@app/components/shared/inputs/switch/switch.component';
import { TextInputComponent } from '@app/components/shared/inputs/text-input/text-input.component';
import { SelectInputComponent } from '@app/components/shared/inputs/select-input/select-input.component';
import { ICustomSelectOption } from '@models/inputs/select-option.model';
import { SectionComponent } from '@app/components/shared/section/section.component';
import {
  settingDefaultFilterSortBy,
  settingFilterCount,
  settingShowKudos,
  settingShowScoreCritic,
  settingShowScorePopular,
  settingShowViews,
} from 'config/settings/local-storage.config';
import { SettingsService } from '@app/services/settings/settings.service';
import { FilterResultsDrawing } from '@models/responses/filter-drawing-response.model';
import { AlertService } from '@app/services/alerts/alert.service';
import { PartialErrorComponent } from '@app/components/shared/errors/partial-error/partial-error.component';

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
    LoadingComponent,
    SwitchComponent,
    TextInputComponent,
    SelectInputComponent,
    SectionComponent,
    PartialErrorComponent,
  ],
  providers: [CustomTranslatePipe],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss',
})
export class FilterFormComponent
  extends LanguageComponent
  implements OnInit, OnDestroy
{
  queryParamsSubscription: Subscription | undefined;

  /* Filter Behaviour */
  showSoftware = true;
  showPaper = true;
  showKudos = settingShowKudos.defaultValue;
  showViews = settingShowViews.defaultValue;
  showScoreCritic = settingShowScoreCritic.defaultValue;
  showScorePopular = settingShowScorePopular.defaultValue;
  defaultSortBy = environment.forms.drawingFilter.default.sortBy;

  /* Communication to parent */
  @Output() fetchedResults = new EventEmitter<FilterResultsDrawing>();
  @Output() isLoading = new EventEmitter<boolean>();
  @Output() isError = new EventEmitter<boolean>();
  @Output() existsMoreResultsToFetch = new EventEmitter<boolean>();

  /* Loading Flags */
  loadingDrawingProducts = true;
  errorProducts = false;
  loadingDrawingCharacters = true;
  errorCharacters = false;
  loadingDrawingModels = true;
  errorModels = false;
  loadingCollections = true;
  errorCollections = false;

  /* Filter Form Select */
  get listOptionsSortBy(): IArtFilterValuesSortBy[] {
    let list = artFilterValuesSortBy;
    if (!this.showKudos) {
      list = list.filter(x => x.class !== 'kudos');
    }
    if (!this.showViews) {
      list = list.filter(x => x.class !== 'views');
    }
    if (!this.showScoreCritic) {
      list = list.filter(x => x.class !== 'mr-score-miguel');
    }
    if (!this.showScorePopular) {
      list = list.filter(x => x.class !== 'mr-score-popular');
    }
    return list;
  }

  listDrawingStyles: DrawingStyle[] = [];
  filteredDrawingStyles: DrawingStyle[] = [];
  listDrawingProductTypes: DrawingProductType[] = [];
  filteredDrawingProductTypes: DrawingProductType[] = [];
  listDrawingProducts: DrawingProduct[] = [];
  filteredDrawingProducts: DrawingProduct[] = [];
  listDrawingCharacters: DrawingCharacter[] = [];
  filteredDrawingCharacters: DrawingCharacter[] = [];
  listDrawingModels: ICustomSelectOption[] = [];
  filteredDrawingModels: ICustomSelectOption[] = [];
  listDrawingSoftwares: DrawingSoftware[] = [];
  filteredDrawingSoftwares: DrawingSoftware[] = [];
  listDrawingPapers: DrawingPaperSize[] = [];
  filteredDrawingPapers: DrawingPaperSize[] = [];
  listCollections: Collection[] = [];
  filteredCollections: Collection[] = [];

  /* Filter Results */
  listDrawings: Drawing[] = [];
  nDrawingCharacters = 0;
  nDrawingModels = 0;
  nDrawingTypes = 0;
  nDrawingProductTypes = 0;
  nDrawingProducts = 0;
  nDrawingCollections = 0;
  nDrawingSoftwares = 0;
  nDrawingPapers = 0;
  nDrawingFavorites = 0;
  filtering = false;
  showFilterCount = settingFilterCount.defaultValue;

  /* Filter Form */
  filterForm = new FormGroup({
    sortBy: new FormControl(this.defaultSortBy),
    textQuery: new FormControl(
      environment.forms.drawingFilter.default.textQuery
    ),
    type: new FormControl<number>(environment.forms.drawingFilter.default.type),
    productType: new FormControl<number>(
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
    software: new FormControl<number>(
      environment.forms.drawingFilter.default.software
    ),
    paper: new FormControl<number>(
      environment.forms.drawingFilter.default.paper
    ),
    formSpotify: new FormControl(
      environment.forms.drawingFilter.default.spotify
    ),
    formFavorites: new FormControl(
      environment.forms.drawingFilter.default.favorites
    ),
    pageSize: new FormControl(ArtFilterFormConfig.pagination.resultsPerPage),
    pageNumber: new FormControl(ArtFilterFormConfig.pagination.firstPage),
  });

  lastResult: FilterResultsDrawing | null = null;

  constructor(
    private drawingService: DrawingService,
    private languageService: LanguageService,
    private alertService: AlertService,
    private customTranslate: CustomTranslatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) {
    super('SCREENS.DRAWING-SEARCH.FORM');
    // this.setValuesFromQueryParams();
  }

  ngOnInit(): void {
    this.settingsService
      .selectSetting$(settingDefaultFilterSortBy)
      .subscribe(value => {
        const option = this.listOptionsSortBy.find(x => x.value === value);
        // console.log('Option: ', option);
        if (option === undefined || option === null) {
          value = environment.forms.drawingFilter.default.sortBy;
        }
        // console.log('Value Patched: ', value);
        this.defaultSortBy = value;
        this.filterForm.controls.sortBy.patchValue(value);
      });
    this.settingsService.booleanSetting$(settingFilterCount).subscribe(show => {
      this.showFilterCount = show;
    });
    this.settingsService.booleanSetting$(settingShowKudos).subscribe(show => {
      this.showKudos = show;
    });
    this.settingsService.booleanSetting$(settingShowViews).subscribe(show => {
      this.showViews = show;
    });
    this.settingsService
      .booleanSetting$(settingShowScoreCritic)
      .subscribe(show => {
        this.showScoreCritic = show;
      });
    this.settingsService
      .booleanSetting$(settingShowScorePopular)
      .subscribe(show => {
        this.showScorePopular = show;
      });

    this.loadSelects();
    this.setValuesFromQueryParams();
  }

  requestDrawingsAfterError() {
    this.submitFilter();
  }

  requestMoreDrawings() {
    this.filterForm.controls.pageNumber.setValue(
      (this.filterForm.value.pageNumber ?? 0) +
        ArtFilterFormConfig.pagination.firstPage
    );
    this.submitFilter();
  }

  onChangeStyle(event: Event) {
    const input = event.target as HTMLSelectElement;
    const value = parseInt(input.value);

    const selectedType = this.listDrawingStyles.find(
      style => style.id === value
    );
    if (selectedType) {
      this.showSoftware = selectedType.showSoftware;
      this.showPaper = selectedType.showPaper;
    } else {
      this.showSoftware = true;
      this.showPaper = true;
    }
  }

  onChangeProductType(event: Event) {
    const input = event.target as HTMLSelectElement;
    const value = parseInt(input.value);
    this.filterProducts(value);
  }

  filterProducts(productTypeId: number | null) {
    if (productTypeId !== null) {
      const selectedProductType = this.listDrawingProductTypes.find(
        style => style.id === productTypeId
      );
      if (selectedProductType) {
        this.filterForm.controls.productName.setValue('');
        this.filteredDrawingProducts = this.listDrawingProducts.filter(
          product => product.productTypeId === productTypeId
        );
        return;
      }
    }
    this.filteredDrawingProducts = this.listDrawingProducts;
  }

  resetFilters() {
    this.filterForm.controls.sortBy.setValue(this.defaultSortBy);
    this.filterForm.controls.textQuery.reset();
    this.filterForm.controls.type.setValue(
      environment.forms.drawingFilter.default.type
    );
    this.filterForm.controls.productType.setValue(
      environment.forms.drawingFilter.default.productType
    );
    this.filterProducts(null);
    this.filterForm.controls.productName.setValue(
      environment.forms.drawingFilter.default.productName
    );
    this.filteredDrawingProducts = this.listDrawingProducts;
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
    this.filtering = false;
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
    this.isError.emit(false);

    const filters = new DrawingFilter(this.filterForm.value);

    if (
      filters.characterName !==
        environment.forms.drawingFilter.default.characterName ||
      filters.collection !==
        environment.forms.drawingFilter.default.collection ||
      filters.favorites ||
      filters.modelName !== environment.forms.drawingFilter.default.modelName ||
      filters.paper !== environment.forms.drawingFilter.default.paper ||
      filters.productName !==
        environment.forms.drawingFilter.default.productName ||
      filters.productType !=
        environment.forms.drawingFilter.default.productType ||
      filters.software != environment.forms.drawingFilter.default.software ||
      filters.textQuery !== environment.forms.drawingFilter.default.textQuery ||
      filters.type != environment.forms.drawingFilter.default.type
    ) {
      this.filtering = true;
    }

    // Prevent resubmitting the form when updating URL query params
    this.queryParamsSubscription?.unsubscribe();
    this.changeBasicArtUrl();

    this.drawingService.filterDrawings(filters).subscribe({
      next: results => {
        this.processFilteredDrawings(results);
        this.isLoading.emit(false);
      },
      error: () => {
        this.alertService.showSilentAlert(
          this.customTranslate,
          'ERRORS.DRAWING.SEARCH.NOTFOUND'
        );
        this.isError.emit(true);
        this.isLoading.emit(false);
      },
    });
  }

  processFilteredDrawings(results: FilterResultsDrawing) {
    if (results === undefined || results === null) {
      return;
    }
    if (results.fetchedCount > 0) {
      if (
        (this.filterForm.value.pageNumber ??
          ArtFilterFormConfig.pagination.firstPage) <= 1
      ) {
        this.listDrawings = results.filteredDrawings;
      } else {
        this.listDrawings = [...this.listDrawings, ...results.filteredDrawings];
      }
    } else {
      if (results.totalCount === 0) {
        this.listDrawings = [];
      }
    }
    results.totalDrawings = this.listDrawings;
    this.lastResult = results;
    this.fetchedResults.emit(results);

    this.processDrawingCharacters();
    this.processDrawingModels();
    this.processDrawingStyles();
    this.processDrawingProductTypes();
    this.processDrawingProducts();
    this.processDrawingSoftware();
    this.processDrawingPapers();

    this.nDrawingFavorites = results.nDrawingFavorites;

    this.processDrawingCollections();

    this.existsMoreResultsToFetch.emit(
      this.listDrawings.length < results.totalCount
    );
  }

  private processDrawingCollections() {
    if (this.listCollections.length > 0 && this.lastResult !== null) {
      this.filteredCollections = this.listCollections.filter(
        c =>
          this.lastResult &&
          this.lastResult.filteredCollections.filter(id => id == c.id).length >
            0
      );
      this.nDrawingCollections = this.lastResult.nDrawingCollections;
    }
  }

  private processDrawingPapers() {
    if (this.listDrawingPapers.length > 0 && this.lastResult !== null) {
      this.filteredDrawingPapers = this.listDrawingPapers.filter(
        p =>
          this.lastResult &&
          this.lastResult.filteredDrawingPapers.filter(
            d => d.toString() == p.value
          ).length > 0
      );
      this.nDrawingPapers = this.lastResult.nDrawingPapers;
    }
  }

  private processDrawingSoftware() {
    if (this.listDrawingSoftwares.length > 0 && this.lastResult !== null) {
      this.filteredDrawingSoftwares = this.listDrawingSoftwares.filter(
        s =>
          this.lastResult &&
          this.lastResult.filteredDrawingSoftwares.filter(
            d => d.toString() == s.value
          ).length > 0
      );
      this.nDrawingSoftwares = this.lastResult.nDrawingSoftwares;
    }
  }

  private processDrawingProducts() {
    if (this.listDrawingProducts.length > 0 && this.lastResult !== null) {
      this.filteredDrawingProducts = this.listDrawingProducts.filter(
        p =>
          this.lastResult &&
          this.lastResult.filteredDrawingProducts.filter(d => d == p.value)
            .length > 0
      );
      this.nDrawingProducts = this.lastResult.nDrawingProducts;
    }
  }

  private processDrawingProductTypes() {
    if (this.listDrawingProductTypes.length > 0 && this.lastResult !== null) {
      this.filteredDrawingProductTypes = this.listDrawingProductTypes.filter(
        pt =>
          this.lastResult &&
          this.lastResult.filteredDrawingProductTypes.filter(
            d => d.toString() == pt.value
          ).length > 0
      );
      this.nDrawingProductTypes = this.lastResult.nDrawingProductTypes;
    }
  }

  private processDrawingStyles() {
    if (this.listDrawingStyles.length > 0 && this.lastResult !== null) {
      this.filteredDrawingStyles = this.listDrawingStyles.filter(
        s =>
          this.lastResult &&
          this.lastResult.filteredDrawingStyles.filter(
            d => d.toString() == s.value
          ).length > 0
      );
      this.nDrawingTypes = this.lastResult.nDrawingTypes;
    }
  }

  processDrawingCharacters() {
    if (this.listDrawingCharacters.length > 0 && this.lastResult !== null) {
      this.filteredDrawingCharacters = this.listDrawingCharacters.filter(
        c =>
          this.lastResult &&
          this.lastResult.filteredDrawingCharacters.filter(
            d => d == c.characterName
          ).length > 0
      );
      this.nDrawingCharacters = this.lastResult.nDrawingCharacters;
    }
  }

  processDrawingModels() {
    if (this.listDrawingModels.length > 0 && this.lastResult !== null) {
      this.filteredDrawingModels = this.listDrawingModels.filter(
        m =>
          this.lastResult &&
          this.lastResult.filteredDrawingModels.filter(d => d == m.value)
            .length > 0
      );
      this.nDrawingModels = this.lastResult.nDrawingModels;
    }
  }

  loadSelects() {
    this.drawingService.getAllCollections().subscribe({
      next: list => {
        this.listCollections = list.map(c => new Collection(c));
        this.processDrawingCollections();
        this.errorCollections = false;
        this.loadingCollections = false;
      },
      error: () => {
        this.listCollections = [];
        this.alertService.showSilentAlert(
          this.customTranslate,
          'ERRORS.COLLECTION.NOTLOADED'
        );
        this.errorCollections = true;
        this.loadingCollections = false;
      },
    });

    this.listDrawingStyles = this.drawingService.getDrawingStyles();
    this.listDrawingProductTypes = this.drawingService.getDrawingProductTypes();
    this.listDrawingSoftwares = this.drawingService.getDrawingSoftwares();
    this.listDrawingPapers = this.drawingService.getDrawingPaperSizes();
    this.drawingService.getDrawingProducts().subscribe({
      next: list => {
        this.listDrawingProducts = list
          .map(p => new DrawingProduct(p))
          .sort(sortProductsByName);
        this.processDrawingProducts();
        this.errorProducts = false;
        this.loadingDrawingProducts = false;
      },
      error: () => {
        this.listDrawingProducts = [];
        this.filteredDrawingProducts = [];
        this.alertService.showSilentAlert(
          this.customTranslate,
          'ERRORS.DRAWING.PRODUCT.NOTLOADED'
        );
        this.errorProducts = true;
        this.loadingDrawingProducts = false;
      },
    });
    this.drawingService.getDrawingCharacters().subscribe({
      next: list => {
        // TODO: añadir el option de ningúno: Value: "none", Label: "CHARACTER.NONE"
        this.listDrawingCharacters = list
          .map(c => new DrawingCharacter(c))
          .filter(c => c.characterName !== '')
          .sort(sortCharactersByName);
        this.processDrawingCharacters();
        this.errorCharacters = false;
        this.loadingDrawingCharacters = false;
      },
      error: () => {
        this.listDrawingCharacters = [];
        this.filteredDrawingCharacters = [];
        this.alertService.showSilentAlert(
          this.customTranslate,
          'ERRORS.DRAWING.CHARACTER.NOTLOADED'
        );
        this.errorCharacters = true;
        this.loadingDrawingCharacters = false;
      },
    });
    this.drawingService.getDrawingModels().subscribe({
      next: list => {
        this.errorModels = false;
        this.listDrawingModels = list
          .sort(sortByTextAscending)
          .map<ICustomSelectOption>(m => {
            return { value: m, label: m, labelCode: '' };
          });
        this.processDrawingModels();
        this.loadingDrawingModels = false;
      },
      error: () => {
        this.listDrawingModels = [];
        this.filteredDrawingModels = [];
        this.alertService.showSilentAlert(
          this.customTranslate,
          'ERRORS.DRAWING.MODEL.NOTLOADED'
        );
        this.errorModels = true;
        this.loadingDrawingModels = false;
      },
    });
  }

  // TODO: arreglar keydown del input
  capturarEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      // this.submitFilter();
    }
  }

  changeBasicArtUrl() {
    const filters = new DrawingFilter(this.filterForm.value);
    const queryParams: Record<string, string> = {};

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
      // console.log('Reading Query Params', this.route.queryParams);
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
      this.setValueFromQueryParamsIntoFormBoolean(
        this.filterForm.controls.formSpotify,
        params[ArtFilterFormConfig.queryParamsNames.spotify] === 'true'
      );
      this.setValueFromQueryParamsIntoFormBoolean(
        this.filterForm.controls.formFavorites,
        params[ArtFilterFormConfig.queryParamsNames.favorites] === 'true'
      );
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
  setValueFromQueryParamsIntoFormBoolean(
    formControl: FormControl,
    parameter: boolean
  ) {
    if (parameter !== null && parameter !== undefined && parameter !== false) {
      formControl.setValue(parameter);
    }
  }

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
  }
}
