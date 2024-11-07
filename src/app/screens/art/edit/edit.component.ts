import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DrawingFormComponent } from '@app/components/art/drawing-form/drawing-form.component';
import { PartialErrorComponent } from '@app/components/shared/errors/partial-error/partial-error.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { CanComponentDeactivate } from '@app/guards/can-deactivate.guard';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AlertService } from '@app/services/alerts/alert.service';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { Drawing } from '@models/art/drawing.model';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    NgIf,
    DrawingFormComponent,
    PartialErrorComponent,
    LayoutComponent,
    CustomTranslatePipe,
  ],
  providers: [CustomTranslatePipe],
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
    private alertService: AlertService,
    private customTranslate: CustomTranslatePipe
  ) {}

  ngOnInit() {
    this.loadDrawing();
  }

  loadDrawing() {
    if (this.id) {
      this.loading = true;
      this.drawingNotFound = false;
      this.drawingService
        .getDrawingDetails(this.id)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: data => {
            this.drawing = new Drawing(data);
            this.metadataService.updateMetadata(
              this.drawing.pageTitle(),
              this.drawing.title,
              this.drawing.urlThumbnail
            );
          },
          error: () => {
            this.alertService.showSilentAlert(
              this.customTranslate,
              'ERRORS.DRAWING.NOTFOUND',
              { id: this.id }
            );
            this.drawingNotFound = true;
          },
        });
    }
  }

  canDeactivate(): boolean | Observable<boolean> {
    return this.alertService.showConfirmDialog(
      '¿Salir?',
      '¿Desea salir? Perderá todos los cambios sin guardar',
      'Salir',
      'Quedarme'
    );
  }
}
