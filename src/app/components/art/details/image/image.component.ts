import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Drawing } from '@models/art/drawing.model';
import { ScoreBoardComponent } from '../score-board/score-board.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { HeartUtils } from 'utils/customization/heart-utils';
import { environment } from 'environments/environment';
import { TextUtils } from 'utils/customization/text-utils';
import { DrawingScoreComponent } from '../../drawing-score/drawing-score.component';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LoadingComponent } from '@app/components/shared/loading/loading.component';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'app-art-details-image',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    CommonModule,
    ScoreBoardComponent,
    DrawingScoreComponent,
    TranslateModule,
    CustomTranslatePipe,
    LoadingComponent,
    TitleComponent,
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent extends LanguageComponent {
  private _drawing!: Drawing;

  @Input() loading = true;

  @Input()
  public get drawing() {
    return this._drawing;
  }
  public set drawing(value: Drawing) {
    this._drawing = value;
  }

  btnCheerId = 'btnCheer';

  @Output() submittedCheer = new EventEmitter<number>();

  constructor(private drawingService: DrawingService) {
    super('SCREENS.DRAWING-DETAILS');
  }

  cheerDrawing(event: MouseEvent) {
    $('#' + this.btnCheerId).attr('disabled', 'true');
    $('#iCheerIcon').addClass('bi-heart-fill');
    $('#iCheerIcon').removeClass('bi-heart');

    const element = document.createElement('div');
    element.innerHTML = HeartUtils.obtenerMensajeAleatorio();

    element.style.left = event.pageX - 20 + 'px';
    element.style.top = event.pageY + 'px';
    element.style.position = 'absolute';
    element.classList.add('mr-thanks-message', 'dissapear-message-thanks');
    document.body.appendChild(element);

    setTimeout(() => {
      element.remove();
    }, environment.utils.hearts.duration.max * 1000);

    HeartUtils.showHearts();

    this.drawingService.cheerDrawing(this.drawing.id).subscribe({
      next: () => {
        this.submittedCheer.emit(this.drawing?.likes + 1);
      },
      error: err => console.error('Error al enviar cheer:', err),
      complete: () => {
        $('#' + this.btnCheerId).removeAttr('disabled');
      },
    });
  }

  fullScreenImage() {
    $('#divImgFull').toggleClass('fullscreen');
  }

  fullScreenImageOnKeyDown(event: KeyboardEvent) {
    if (event.key === 'F' || event.key === 'f') {
      this.fullScreenImage();
    }
  }

  formatoLegible(numero: number) {
    return TextUtils.formatoLegible(numero);
  }

  errorLoadingImage(drawingId: string) {
    // console.log('Drawing ID not loaded: ' + drawingId);
    const selector =
      ".mr-error-load-placeholder[data-error-drawing-id='" + drawingId + "']";
    //console.log(selector);
    $(selector).addClass('show');
  }

  // TODO: cambiar el texto de esto
  shareDrawing() {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: 'Check out this awesome site!',
          url: window.location.href,
        })
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(error => {
          console.error('Error sharing', error);
        });
    } else {
      console.error('Web Share API not supported in your browser.');
    }
  }
}
