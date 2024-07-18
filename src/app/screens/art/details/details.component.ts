import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from '../../../services/logger/logger.service';
import { ApiService } from '../../../services/api/api.service';
import { Drawing } from '../../../../models/art/drawing.model';
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { TitleComponent } from '../../../components/art/details/title/title.component';
import { TrackComponent } from '../../../components/spotify/track/track.component';
import { CommentComponent } from '@app/components/art/details/comment/comment.component';
import { CommentWrapperComponent } from '@app/components/art/details/comment-wrapper/comment-wrapper.component';

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
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  @Input() id: string | null = null;
  response: any;
  drawing: Drawing | undefined;
  drawingNotFound: boolean | undefined;

  constructor(
    private logger: LoggerService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.logger.log('ID: ' + this.id);
    this.loadDrawing();
  }

  loadDrawing() {
    if (this.id) {
      this.api.getDrawingDetails(this.id).subscribe(data => {
        this.response = data;
        if (data) {
          // this.logger.log(data);
          this.drawing = data;
          // this.logger.log(this.drawing);
        }
        this.drawingNotFound = data === undefined || data.id === '';
      });
    }
  }
}
