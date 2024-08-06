import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ff-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ff-panel.component.html',
  styleUrl: './ff-panel.component.scss',
})
export class FfPanelComponent {
  @Input() title = '';
  @Input() margin = false;
}
