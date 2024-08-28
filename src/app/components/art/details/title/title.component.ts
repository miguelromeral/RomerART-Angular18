import { Component, Input } from '@angular/core';
import { LoadingComponent } from '@app/components/shared/loading/loading.component';

@Component({
  selector: 'app-art-details-title',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent {
  @Input() character = '';
  @Input() modelName = '';
  @Input() loading = true;
}
