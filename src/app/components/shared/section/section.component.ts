import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  @Input() icon = '';
  @Input() type: 'h2' | 'h3' = 'h2';
  @Input() title!: string;
}
