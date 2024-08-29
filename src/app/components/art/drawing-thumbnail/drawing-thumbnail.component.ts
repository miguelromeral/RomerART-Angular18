import { NgClass, NgIf } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Drawing } from '@models/art/drawing.model';
import { DrawingScoreComponent } from '../drawing-score/drawing-score.component';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageService } from '@app/services/language/language.service';
import { settingLanguage } from 'config/settings/language.config';
import { formattedDateMini } from '@utils/customization/date-utils';
import { drawingThumbnailAnimation } from '@app/animations/art/drawing-thumbnail.animation';
import { settingFormatDate } from 'config/settings/local-storage.config';
import { SettingsService } from '@app/services/settings/settings.service';

@Component({
  selector: 'app-drawing-thumbnail',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    RouterLink,
    DrawingScoreComponent,
    TranslateModule,
    CustomTranslatePipe,
  ],
  templateUrl: './drawing-thumbnail.component.html',
  styleUrl: './drawing-thumbnail.component.scss',
  animations: [drawingThumbnailAnimation],
})
export class DrawingThumbnailComponent
  extends LanguageComponent
  implements OnInit
{
  @HostBinding('@fadeInOut') fadeInOut = true;
  private _drawing!: Drawing;

  @Input()
  public get drawing() {
    return this._drawing;
  }
  public set drawing(value: Drawing) {
    this._drawing = value;
    this.init();
  }

  @Input() fullsize = false;
  url = '';
  currentLanguage = settingLanguage.defaultValue;
  currentFormatDate = settingFormatDate.defaultValue;

  bErrorLoadingImage = false;

  constructor(
    private languageService: LanguageService,
    private settingsService: SettingsService
  ) {
    super('SCREENS.DRAWING-DETAILS');
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.bErrorLoadingImage = false;
    this.detectThumbnailUrl();
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
    this.settingsService.selectSetting$(settingFormatDate).subscribe(format => {
      this.currentFormatDate = format;
    });
  }

  detectThumbnailUrl() {
    this.url = this.drawing.urlThumbnail;
    if (this.fullsize) {
      this.url = this.drawing.url;
    }
    if (this.url.length === 0) {
      this.url = this.drawing.url;
    }
  }

  formatDateMini(date: Date) {
    return formattedDateMini(
      date,
      this.currentLanguage,
      this.currentFormatDate
    );
  }

  errorLoadingImage() {
    // console.log('Error loading image');
    this.bErrorLoadingImage = true;
  }
}
