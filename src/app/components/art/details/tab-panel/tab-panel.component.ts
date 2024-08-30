import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TabPanelItem } from '@models/components/tab-panel-item.model';
import { TranslateModule } from '@ngx-translate/core';
import Swiper from 'swiper';

import {
  artTabInfoIds,
  IArtInfoTabsConfigId,
} from 'config/art/art-info-tabs.config';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-tab-panel',
  standalone: true,
  imports: [CommonModule, TranslateModule, CustomTranslatePipe],
  templateUrl: './tab-panel.component.html',
  styleUrl: './tab-panel.component.scss',
})
export class TabPanelComponent
  extends LanguageComponent
  implements AfterViewInit
{
  @Input() tabs: TabPanelItem[] = [];
  @Input() showSpotify!: boolean;
  @Input() showScorePopular!: boolean;
  panelsId: IArtInfoTabsConfigId = artTabInfoIds;
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  swiper!: Swiper;
  currentTabIndex = 0; // Variable para el índice de la pestaña actual

  constructor() {
    super('SCREENS.DRAWING-DETAILS');
  }

  ngAfterViewInit() {
    this.initSwiper();
  }

  initSwiper() {
    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChange: () => this.onSlideChange(),
      },
    } as SwiperOptions);
  }

  slideTo(index: number) {
    if (index >= this.tabs.length) return;

    this.swiper.slideTo(index);
  }

  onSlideChange() {
    if (this.swiper.activeIndex >= this.tabs.length) {
      this.swiper.slideTo(this.tabs.length - 1);
    }
    this.currentTabIndex = this.swiper.activeIndex; // Actualiza el índice de la pestaña actual
  }
}
