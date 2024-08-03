import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Drawing } from '@models/art/drawing.model';
import { DrawingScoreComponent } from '../drawing-score/drawing-score.component';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';

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
})
export class DrawingThumbnailComponent
  extends LanguageComponent
  implements OnInit
{
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

  bErrorLoadingImage = false;

  constructor() {
    super('SCREENS.DRAWING-DETAILS');
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.bErrorLoadingImage = false;
    this.detectThumbnailUrl();
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

  errorLoadingImage() {
    console.log('Error loading image');
    this.bErrorLoadingImage = true;
  }
}
