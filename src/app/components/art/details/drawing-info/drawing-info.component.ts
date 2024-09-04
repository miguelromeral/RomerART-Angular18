import { CommonModule } from '@angular/common';
import { Drawing } from '@models/art/drawing.model';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommentComponent } from '@app/components/art/details/comment/comment.component';
import { CommentWrapperComponent } from '@app/components/art/details/comment-wrapper/comment-wrapper.component';
import { SectionComponent } from '@app/components/art/details/section/section.component';
import { ImageComponent } from '@app/components/art/details/image/image.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { ScoreBoardComponent } from '@app/components/art/details/score-board/score-board.component';
import { ArtSectionType } from 'config/art/art-section.config';
import { TabPanelComponent } from '@app/components/art/details/tab-panel/tab-panel.component';
import { TabPanelItem } from '@models/components/tab-panel-item.model';
import {
  ArtInfoTabsConfig,
  artTabInfoIds,
  IArtInfoTabsConfigId,
} from 'config/art/art-info-tabs.config';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '@app/components/shared/loading/loading.component';
import { TranslatableComponent } from '@app/components/shared/translatable/translatable.component';
import { LanguageService } from '@app/services/language/language.service';
import { formattedDate } from '@utils/customization/date-utils';
import { settingLanguage } from 'config/settings/language.config';
import {
  settingShowScorePopular,
  settingShowSpotify,
  settingShowViews,
} from 'config/settings/local-storage.config';
import { SettingsService } from '@app/services/settings/settings.service';
import { drawingStyles } from 'config/data/drawing-styles.config';
import { drawingFilterEffects } from 'config/data/drawing-filter-effect.config';
import { TrackComponent } from '@app/components/spotify/track/track.component';
import { IVoteDrawingResponse } from '@models/responses/vote-drawing-response.model';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-drawing-info',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    CommentWrapperComponent,
    SectionComponent,
    RouterModule,
    ImageComponent,
    LayoutComponent,
    ScoreBoardComponent,
    TabPanelComponent,
    TranslateModule,
    CustomTranslatePipe,
    LoadingComponent,
    TrackComponent,
    TranslatableComponent,
  ],
  templateUrl: './drawing-info.component.html',
  styleUrl: './drawing-info.component.scss',
  providers: [CustomTranslatePipe],
})
export class DrawingInfoComponent
  extends LanguageComponent
  implements OnInit, AfterViewInit
{
  private _drawing!: Drawing;

  @Input()
  public get drawing() {
    return this._drawing;
  }
  public set drawing(value: Drawing) {
    this._drawing = value;
    this.loadTabs();
  }

  @Input() loading!: boolean;
  @Output() voteSubmitted = new EventEmitter<IVoteDrawingResponse>();

  panelTabs: TabPanelItem[] = [];
  panelTabsId: IArtInfoTabsConfigId = artTabInfoIds;
  currentLanguage: string = settingLanguage.defaultValue;
  showSpotify = settingShowSpotify.defaultValue;
  showViews = settingShowViews.defaultValue;
  showScorePopular = settingShowScorePopular.defaultValue;

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  swiper!: Swiper;
  currentTabIndex = 0; // Variable para el índice de la pestaña actual

  constructor(
    private languageService: LanguageService,
    private settingsService: SettingsService,
    private customTranslate: CustomTranslatePipe
  ) {
    super('SCREENS.DRAWING-DETAILS');
  }

  ngOnInit() {
    this.settingsService.booleanSetting$(settingShowSpotify).subscribe(show => {
      this.showSpotify = show;
    });
    this.settingsService.booleanSetting$(settingShowViews).subscribe(show => {
      this.showViews = show;
    });
    this.settingsService
      .booleanSetting$(settingShowScorePopular)
      .subscribe(show => {
        this.showScorePopular = show;
      });
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  ngAfterViewInit() {
    this.initSwiper();
  }

  receiveVoteSubmitted(results: IVoteDrawingResponse) {
    this.voteSubmitted.next(results);
  }

  loadTabs() {
    // TODO: arreglar el orden de las tabs
    this.panelTabs = [];
    this.panelTabs = ArtInfoTabsConfig.getTabs(
      this.drawing,
      this.showScorePopular,
      this.showSpotify
    );
    // console.log('Panel Tabs: ', this.panelTabs);
  }

  isTabVisible(id: string): boolean {
    return this.panelTabs.find(tab => tab.id === id) !== undefined;
  }

  getProductSectionType(): ArtSectionType {
    switch (this.drawing?.productType) {
      case 1:
        return 'game';
      case 2:
        return 'actor';
      case 3:
        return 'singer';
      case 4:
        return 'sportman';
      default:
        return '';
    }
  }

  formattedDate(date: Date) {
    return formattedDate(date, this.currentLanguage);
  }

  getTextStyle(id: number) {
    const style = drawingStyles.find(x => x.id === id);
    if (style) {
      return this.customTranslate.transform(style.code);
    }
    return '';
  }

  getTextFilter(id: number) {
    const filter = drawingFilterEffects.find(x => x.id === id);
    if (filter) {
      return this.customTranslate.transform(filter.labelCode);
    }
    return '';
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
    if (index >= this.panelTabs.length) return;

    this.swiper.slideTo(index);
  }

  onSlideChange() {
    if (this.swiper.activeIndex >= this.panelTabs.length) {
      this.swiper.slideTo(this.panelTabs.length - 1);
    }
    this.currentTabIndex = this.swiper.activeIndex; // Actualiza el índice de la pestaña actual
  }
}
