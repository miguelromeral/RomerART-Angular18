import { Component, Input, OnInit } from '@angular/core';
import { DrawingFormComponent } from '@app/components/art/drawing-form/drawing-form.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { Drawing } from '@models/art/drawing.model';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [DrawingFormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  @Input() id: string | null = null;
  drawing: Drawing = new Drawing();
  drawingNotFound: boolean | undefined;
  loading = true;

  constructor(
    private drawingService: DrawingService,
    private metadataService: MetadataService
  ) {}

  ngOnInit() {
    this.loadDrawing();
  }

  loadDrawing() {
    if (this.id) {
      this.drawingService.getDrawingDetails(this.id).subscribe(data => {
        if (data) {
          this.drawing = new Drawing(data);
          this.metadataService.updateMetadata(
            this.drawing.pageTitle(),
            this.drawing.title,
            this.drawing.urlThumbnail
          );
        } else {
          this.drawingNotFound = true;
        }
        this.loading = false;
      });
    }
  }
}
