import { Component } from '@angular/core';
import { DrawingFormComponent } from '@app/components/drawings/drawing-form/drawing-form.component';
import { LayoutComponent } from '@app/components/common/layout/layout/layout.component';
import { CanComponentDeactivate } from '@app/guards/can-deactivate.guard';
import { AlertService } from '@app/services/alerts/alert.service';
import { Drawing } from '@models/art/drawing.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-drawing-create-screen',
  standalone: true,
  imports: [DrawingFormComponent, LayoutComponent],
  templateUrl: './drawing-create-screen.component.html',
  styleUrl: './drawing-create-screen.component.scss',
})
export class DrawingCreateScreenComponent implements CanComponentDeactivate {
  drawing: Drawing = new Drawing();

  constructor(private alertService: AlertService) {}

  canDeactivate(): boolean | Observable<boolean> {
    // console.log('canDeactivate en el componente ejecutado');

    return this.alertService.showConfirmDialog(
      '¿Salir?',
      '¿Desea salir? Perderá todos los cambios sin guardar',
      'Salir',
      'Quedarme'
    );
  }
}
