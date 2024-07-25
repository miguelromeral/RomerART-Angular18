import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { LanguageService } from '@app/services/language/language.service';
import { DrawingProductType } from '@models/art/drawing-product-type.model';
import { DrawingProduct } from '@models/art/drawing-product.model';
import { DrawingStyle } from '@models/art/drawing-style.model';
import { Subscription } from 'rxjs';
import {
  sortByTextAscending,
  sortCharactersByName,
  sortProductsByName,
} from '@utils/sorting/sort-utils';
import { DrawingCharacter } from '@models/art/drawing-character.model';
import { DrawingSoftware } from '@models/art/drawing-software.model';
import { DrawingPaperSize } from '@models/art/drawing-paper-size.model';
import { Drawing } from '@models/art/drawing.model';
import { DrawingThumbnailComponent } from '@app/components/art/drawing-thumbnail/drawing-thumbnail.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DrawingFilter } from '@models/art/drawing-filter.model';
import { environment } from 'environments/environment';
import { Collection } from '@models/art/collection.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    NgIf,
    NgClass,
    DrawingThumbnailComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  private languageSub: Subscription | undefined;
  queryParamsSubscription: Subscription | undefined;

  /* Filter Form Select */
  listDrawingStyles: DrawingStyle[] = [];
  listDrawingProductTypes: DrawingProductType[] = [];
  listDrawingProducts: DrawingProduct[] = [];
  listDrawingCharacters: DrawingCharacter[] = [];
  listDrawingModels: string[] = [];
  listDrawingSoftwares: DrawingSoftware[] = [];
  listDrawingPapers: DrawingPaperSize[] = [];
  listCollections: Collection[] = [];

  /* Filter Form Behaviour */
  filterFormLoading = true;
  get resultsNotFound(): boolean {
    return this.listDrawings.length === 0;
  }

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
  });

  queryParamsNames = {
    sortBy: 'sort',
    textQuery: 'query',
    type: 'type',
    productType: 'product_type',
    product: 'product',
    collection: 'collection',
    character: 'character',
    modelName: 'model',
    software: 'software',
    paper: 'paper',
    spotify: 'spotify',
    favorites: 'favorites',
  };

  /* Result List */
  listDrawings: Drawing[] = [];

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
    this.changeBasicArtUrl();
  }

  submitFilter() {
    this.filterFormLoading = true;

    const filters = new DrawingFilter(this.filterForm.value);

    // Prevent resubmitting the form when updating URL query params
    this.queryParamsSubscription?.unsubscribe();
    this.changeBasicArtUrl();
    this.drawingService.filterDrawings(filters).subscribe(results => {
      this.listDrawings = results;
      // console.log('Results: ' + results.map(d => d.id));
      this.filterFormLoading = false;
    });
  }

  constructor(
    private drawingService: DrawingService,
    private languageService: LanguageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadSelects();

    this.languageSub = this.languageService.currentLanguage$.subscribe(lang => {
      console.log('Traduciendo cadenas en search... (' + lang + ')');
      this.translateData();
    });

    this.setValuesFromQueryParams();
    // this.filterResults();
  }

  filterResults() {
    this.drawingService.getAllDrawings().subscribe(list => {
      this.listDrawings = list;
      this.filterFormLoading = false;
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

  // changeBasicArtUrl() {
  // this.changeArtUrl(
  //   $(this.filtersControls.tags).val(),
  //   $(this.filtersControls.type).val(),
  //   $(this.filtersControls.product).val(),
  //   $(this.filtersControls.productName).val(),
  //   $(this.filtersControls.collection).val(),
  //   $(this.filtersControls.characterName).val(),
  //   $(this.filtersControls.model).val(),
  //   $(this.filtersControls.software).val(),
  //   $(this.filtersControls.paper).val(),
  //   $(this.filtersControls.spotify).val(),
  //   $(this.filtersControls.favorite).prop('checked'),
  //   $(this.filtersControls.sortby).val(),
  //   false
  // );
  // }
  // changeArtUrl(
  //   textQuery: string,
  //   type: number,
  //   productType: number,
  //   productName: string,
  //   collection: string,
  //   characterName: string,
  //   modelName: string,
  //   software: number,
  //   paper: number,
  //   spotify: boolean,
  //   favorites: boolean,
  //   sortby: string,
  //   submit: boolean
  // ) {
  //   // Obtén la URL base
  //   // const baseUrl =
  //   //   window.location.protocol +
  //   //   '//' +
  //   //   window.location.host +
  //   //   window.location.pathname;
  //   // let queryParams = [];
  //   // queryParams.push(
  //   //   this.setFilterValue(this.filtersControls.tags, 'TextQuery', textQuery)
  //   // );
  //   // queryParams.push(
  //   //   this.setFilterValue(this.filtersControls.type, 'Type', type, [-1])
  //   // );
  //   // queryParams.push(
  //   //   this.setFilterValue(
  //   //     this.filtersControls.product,
  //   //     'ProductType',
  //   //     productType,
  //   //     [-1]
  //   //   )
  //   // );
  //   // queryParams.push(
  //   //   this.setFilterValue(
  //   //     this.filtersControls.productName,
  //   //     'ProductName',
  //   //     productName
  //   //   )
  //   // );
  //   // queryParams.push(
  //   //   this.setFilterValue(
  //   //     this.filtersControls.collection,
  //   //     'Collection',
  //   //     collection
  //   //   )
  //   // );
  //   // queryParams.push(
  //   //   this.setFilterValue(
  //   //     this.filtersControls.characterName,
  //   //     'CharacterName',
  //   //     characterName
  //   //   )
  //   // );
  //   // queryParams.push(
  //   //   this.setFilterValue(this.filtersControls.model, 'ModelName', modelName)
  //   // );
  //   // queryParams.push(
  //   //   this.setFilterValue(this.filtersControls.software, 'Software', software, [
  //   //     0,
  //   //   ])
  //   // );
  //   // queryParams.push(
  //   //   this.setFilterValue(this.filtersControls.paper, 'Paper', paper, [0])
  //   // );
  //   // queryParams.push(
  //   //   this.setFilterValue(this.filtersControls.spotify, 'Spotify', spotify, [
  //   //     'null',
  //   //   ])
  //   // );
  //   // queryParams.push(
  //   //   this.setFilterValue(
  //   //     this.filtersControls.favorite,
  //   //     'Favorites',
  //   //     favorites,
  //   //     [false],
  //   //     true
  //   //   )
  //   // );
  //   // queryParams.push(
  //   //   this.setFilterValue(this.filtersControls.sortby, 'Sortby', sortby, [
  //   //     'date-desc',
  //   //   ])
  //   // );
  //   // queryParams = queryParams.filter(x => x != null);
  //   // //console.log(queryParams);
  //   // let params = '';
  //   // if (queryParams.length > 0) {
  //   //   params = '?' + queryParams.join('&');
  //   // }
  //   // const newUrl = baseUrl + params;
  //   // // Cambia la URL sin recargar la página
  //   // history.pushState(null, null, newUrl);
  //   // // Puedes imprimir la nueva URL en la consola para verificar
  //   // //console.log("Nueva URL:", window.location.href);
  //   // if (submit) {
  //   //   this.sendFormFilterGallery();
  //   // }
  // }

  // setFilterValue<T>(
  //   querySelector: string,
  //   name: string,
  //   value: T,
  //   ommitValues: T[] = [],
  //   isSwitch = false
  // ) {
  //   // if (ommitValues == undefined || ommitValues == null) {
  //   //   ommitValues = [];
  //   // }
  //   // if (
  //   //   value != undefined &&
  //   //   value != null &&
  //   //   value != '' &&
  //   //   ommitValues.filter(x => x == value).length == 0
  //   // ) {
  //   //   if (isSwitch != undefined && isSwitch != null && isSwitch) {
  //   //     $(querySelector).prop('checked', value);
  //   //   } else {
  //   //     $(querySelector).val(value);
  //   //   }
  //   //   return name + '=' + value;
  //   // }
  //   // return null;
  // }

  /* Set values into query paramaters */

  changeBasicArtUrl() {
    const filters = new DrawingFilter(this.filterForm.value);
    const queryParams: Record<string, string> = {};

    this.changeBasicArtUrlParameter(
      queryParams,
      this.queryParamsNames.textQuery,
      filters,
      'textQuery'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      this.queryParamsNames.type,
      filters,
      'type'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      this.queryParamsNames.productType,
      filters,
      'productType'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      this.queryParamsNames.product,
      filters,
      'productName'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      this.queryParamsNames.collection,
      filters,
      'collection'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      this.queryParamsNames.character,
      filters,
      'characterName'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      this.queryParamsNames.modelName,
      filters,
      'modelName'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      this.queryParamsNames.software,
      filters,
      'software'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      this.queryParamsNames.paper,
      filters,
      'paper'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      this.queryParamsNames.spotify,
      filters,
      'formSpotify'
    );
    this.changeBasicArtUrlParameter(
      queryParams,
      this.queryParamsNames.favorites,
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
        params[this.queryParamsNames.textQuery]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.type,
        params[this.queryParamsNames.type]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.productType,
        params[this.queryParamsNames.productType]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.productName,
        params[this.queryParamsNames.product]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.collection,
        params[this.queryParamsNames.collection]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.characterName,
        params[this.queryParamsNames.character]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.modelName,
        params[this.queryParamsNames.modelName]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.software,
        params[this.queryParamsNames.software]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.paper,
        params[this.queryParamsNames.paper]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.formSpotify,
        params[this.queryParamsNames.spotify]
      );
      this.setValueFromQueryParamsIntoForm(
        this.filterForm.controls.formFavorites,
        params[this.queryParamsNames.favorites]
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
