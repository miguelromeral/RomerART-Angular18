import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-art-details-title',
  standalone: true,
  imports: [NgIf],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent {
  @Input() character = '';
  @Input() modelName = '';
  @Input() loading = true;
}
