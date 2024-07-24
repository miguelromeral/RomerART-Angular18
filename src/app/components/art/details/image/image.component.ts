import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Drawing } from '@models/art/drawing.model';
import { ScoreBoardComponent } from '../score-board/score-board.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { HeartUtils } from 'utils/customization/heart-utils';

@Component({
  selector: 'app-art-details-image',
  standalone: true,
  imports: [NgIf, NgClass, ScoreBoardComponent],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  @Input() drawing!: Drawing;
  timeMsDelayLike = 3000; // Define el tiempo de retraso si no está definido en tu código

  constructor(private drawingService: DrawingService) {}

  cheerDrawing(event: MouseEvent) {
    $('#btnCheer').attr('disabled', 'true');
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
    }, 3000);

    HeartUtils.showHearts(this.timeMsDelayLike);

    this.drawingService.cheerDrawing(this.drawing.id).subscribe({
      next: () => console.log('Cheer enviado correctamente!'),
      error: err => console.error('Error al enviar cheer:', err),
      complete: () => {
        $('#btnCheer').removeAttr('disabled');
      },
    });
    console.log('done');
  }

  fullScreenImage() {
    $('#divImgFull').toggleClass('fullscreen');
  }

  errorLoadingImage(drawingId: string) {
    // console.log('Drawing ID not loaded: ' + drawingId);
    const selector =
      ".mr-error-load-placeholder[data-error-drawing-id='" + drawingId + "']";
    //console.log(selector);
    $(selector).addClass('show');
  }
}
