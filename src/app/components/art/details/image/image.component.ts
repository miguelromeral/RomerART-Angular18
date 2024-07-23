import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Drawing } from '@models/art/drawing.model';
import { ScoreBoardComponent } from '../score-board/score-board.component';

@Component({
  selector: 'app-art-details-image',
  standalone: true,
  imports: [NgIf, NgClass, ScoreBoardComponent],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  @Input() drawing!: Drawing;

  cheerDrawing() {
    console.log('cheer');
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
