import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-section',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent {
  tagDelimiter = ';';

  @Input() title!: string;
  @Input() rawText = '';
  @Input() listItems: string[] = [];
  @Input() listTags: string[] = [];
  @Input() large = false;
  @Input() tags = false;
  @Input() capitalize = false;
}
