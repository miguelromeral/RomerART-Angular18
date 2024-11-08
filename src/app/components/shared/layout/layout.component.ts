import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { filterFormAnimation } from '@app/animations/art/filter-form.animations';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [filterFormAnimation],
})
export class LayoutComponent {
  @Input() padding = true;
}
