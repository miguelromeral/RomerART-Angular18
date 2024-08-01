import { Component } from '@angular/core';
import { DrawingFormComponent } from '@app/components/art/drawing-form/drawing-form.component';
import { Drawing } from '@models/art/drawing.model';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [DrawingFormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  drawing: Drawing = new Drawing();
}
