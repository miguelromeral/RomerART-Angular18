import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  private languageSub: Subscription | undefined;
  listDrawingStyles: DrawingStyle[] = [];
  listDrawingProductTypes: DrawingProductType[] = [];
  listDrawingProducts: DrawingProduct[] = [];
  listDrawingCharacters: DrawingCharacter[] = [];
  listDrawingModels: string[] = [];
  listDrawingSoftwares: DrawingSoftware[] = [];
  listDrawingPapers: DrawingPaperSize[] = [];

  constructor(
    private drawingService: DrawingService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadSelects();

    this.languageSub = this.languageService.currentLanguage$.subscribe(lang => {
      console.log('Traduciendo cadenas en search... (' + lang + ')');
      this.translateData();
    });
  }

  loadSelects() {
    this.listDrawingStyles = this.drawingService.getDrawingStyles();
    this.listDrawingProductTypes = this.drawingService.getDrawingProductTypes();
    this.drawingService.getDrawingProducts().subscribe(list => {
      // TODO: hacer que esto funcione
      this.listDrawingProducts = list.sort(sortProductsByName);
    });
    this.drawingService.getDrawingCharacters().subscribe(list => {
      this.listDrawingCharacters = list.sort(sortCharactersByName);
    });
    this.drawingService.getDrawingModels().subscribe(list => {
      this.listDrawingModels = list.sort(sortByTextAscending);
    });
    this.listDrawingSoftwares = this.drawingService.getDrawingSoftwares();
    this.listDrawingPapers = this.drawingService.getDrawingPaperSizes();
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

  FILTER_FORM_ID = 'formFilter';
  ALERT_FILTER_FORM_ID = 'formFilterAlert';

  LOADING_ICON_ART_GALLERY = 'artGalleryLoader';
  DIV_ART_GALLERY = 'artGallery';

  CHEER_FORM_ID = 'cheerForm';

  timeMsDelayLike = 1000;

  filtersControls = {
    tags: '#tbTags',
    type: '#sFilterType',
    product: '#sFilterProduct',
    productName: '#sFilterProductName',
    collection: '#sFilterCollection',
    characterName: '#sFilterCharacterName',
    model: '#sFilterModel',
    software: '#sFilterSoftware',
    paper: '#sFilterPaper',
    spotify: '#sFilterSpotify',
    favorite: '#flexSwitchCheckChecked',
    sortby: '#sFilterSortBy',
  };

  sendFormFilterGallery() {
    // this.changeBasicArtUrl();
    // $('#' + this.FILTER_FORM_ID).submit();
  }

  changeBasicArtUrl() {
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
  }
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
}
