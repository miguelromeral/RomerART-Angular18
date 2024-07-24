import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from '../../../services/logger/logger.service';
import { Drawing } from '../../../../models/art/drawing.model';
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { TitleComponent } from '../../../components/art/details/title/title.component';
import { TrackComponent } from '../../../components/spotify/track/track.component';
import { CommentComponent } from '@app/components/art/details/comment/comment.component';
import { CommentWrapperComponent } from '@app/components/art/details/comment-wrapper/comment-wrapper.component';
import { SectionComponent } from '@app/components/art/details/section/section.component';
import { ImageComponent } from '@app/components/art/details/image/image.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    TitleComponent,
    TrackComponent,
    NgFor,
    NgClass,
    CommentComponent,
    CommentWrapperComponent,
    SectionComponent,
    ImageComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  @Input() id: string | null = null;
  drawing: Drawing | undefined;
  drawingNotFound: boolean | undefined;

  constructor(
    private logger: LoggerService,
    private drawingService: DrawingService
  ) {}

  ngOnInit() {
    this.loadDrawing();
  }

  loadDrawing() {
    if (this.id) {
      this.drawingService.getDrawingDetails(this.id).subscribe(data => {
        if (data) {
          // this.logger.log(data);
          this.drawing = data;
          // this.logger.log(this.drawing);
        }
        this.drawingNotFound = data === undefined || data.id === '';
      });
    }
  }

  getProductTitle(): string {
    switch (this.drawing?.productType) {
      case 1:
        return '🎮 Videojuego';
      case 2:
        return '🎞 Actor/Actriz';
      case 3:
        return '🎙 Cantante';
      case 4:
        return '⚽ Deporte';
      default:
        return 'Temática';
    }
  }
}
