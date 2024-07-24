import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Drawing } from '@models/art/drawing.model';
import { ScoreBoardComponent } from '../score-board/score-board.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { HeartUtils } from 'utils/customization/heart-utils';
import { environment } from 'environments/environment';
import { TextUtils } from 'utils/customization/text-utils';

@Component({
  selector: 'app-art-details-image',
  standalone: true,
  imports: [NgIf, NgClass, ScoreBoardComponent],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  @Input() drawing!: Drawing;
  btnCheerId = 'btnCheer';

  constructor(private drawingService: DrawingService) {}

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
}
