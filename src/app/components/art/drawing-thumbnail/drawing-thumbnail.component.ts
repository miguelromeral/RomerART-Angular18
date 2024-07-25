import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Drawing } from '@models/art/drawing.model';
import { Customization } from '@utils/customization';

@Component({
  selector: 'app-drawing-thumbnail',
  standalone: true,
  imports: [NgClass, NgIf, RouterLink],
  templateUrl: './drawing-thumbnail.component.html',
  styleUrl: './drawing-thumbnail.component.scss',
})
export class DrawingThumbnailComponent implements OnInit {
  @Input() drawing!: Drawing;
  @Input() fullsize = false;
  url = '';

  bErrorLoadingImage = false;

  ngOnInit() {
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

  // TODO: llevar esta función a otro lado para reutilizarla
  errorLoadingImage(drawingId: string) {
    // const selector =
    //   ".mr-error-load-placeholder[data-error-drawing-id='" + drawingId + "']";
    // //console.log(selector);
    // $(selector).addClass('show');
    console.log('Error loading image');
    this.bErrorLoadingImage = true;
  }

  getClassScore(score: number) {
    return Customization.getClassScore(score);
  }
}
