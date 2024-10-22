import { Component, Input, OnInit } from '@angular/core';
import { DrawingFormComponent } from '@app/components/art/drawing-form/drawing-form.component';
import { CanComponentDeactivate } from '@app/guards/can-deactivate.guard';
import { AlertService } from '@app/services/alerts/alert.service';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { Drawing } from '@models/art/drawing.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [DrawingFormComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit, CanComponentDeactivate {
  @Input() id: string | null = null;
  drawing: Drawing = new Drawing();
  drawingNotFound: boolean | undefined;
  loading = true;

  constructor(
    private drawingService: DrawingService,
    private metadataService: MetadataService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadDrawing();
  }

  canDeactivate(): boolean | Observable<boolean> {
    // console.log('canDeactivate en el componente ejecutado');

    return this.alertService.showConfirmDialog(
      '¿Salir?',
      '¿Desea salir? Perderá todos los cambios sin guardar',
      'Salir',
      'Quedarme'
    );
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
