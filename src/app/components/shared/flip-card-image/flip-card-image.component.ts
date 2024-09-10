import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ZoomImageComponent } from '../zoom-image/zoom-image.component';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-flip-card-image',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    ZoomImageComponent,
    TranslateModule,
    CustomTranslatePipe,
  ],
  templateUrl: './flip-card-image.component.html',
  styleUrl: './flip-card-image.component.scss',
})
export class FlipCardImageComponent extends LanguageComponent {
  private _url = '';
  error = false;

  @Output() imageNotFound = new EventEmitter<void>();

  @Input()
  public get url() {
    return this._url;
  }
  public set url(value: string) {
    this.error = false;
    this._url = value;
  }

  constructor() {
    super('COMPONENTS.FLIP-CARD');
  }

  iconToShow(): string {
    if (this.url) {
      if (this.url.includes('instagram')) {
        return 'bi-instagram';
      }
      if (this.url.includes('reddit')) {
        return 'bi-reddit';
      }
      if (this.url.includes('twimg')) {
        return 'bi-twitter-x';
      }
      if (this.url.includes('pinimg') || this.url.includes('pinterest')) {
        return 'bi-pinterest';
      }
    }
    return 'bi-image';
  }

  onImageNotFound() {
    this.error = true;
    this.imageNotFound.emit();
  }
}
