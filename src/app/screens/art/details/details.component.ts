import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from '../../../services/logger/logger.service';
import { ApiService } from '../../../services/api/api.service';
import { Drawing } from '../../../../models/art/drawing.model';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgIf, JsonPipe],
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
      this.logger.log(
        `The drawing with ID '${this.id}' should be loading here...`
      );

      this.api.getDrawingDetails(this.id).subscribe(data => {
        this.response = data;
        if (data) {
          // this.logger.log(data);
          this.drawing = data;
          this.logger.log(this.drawing);
        }
        this.drawingNotFound = data === undefined || data.id === '';
      });
    }
  }
}
