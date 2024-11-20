import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { filterFormAnimation } from '@app/animations/art/filter-form.animations';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
  animations: [filterFormAnimation],
})
export class SectionComponent {
  @Input() icon = '';
  @Input() type: 'h2' | 'h3' = 'h2';
  @Input() title!: string;
  @Input() collapsable = false;
  @Input() isCollapsed = false;

  collapse() {
    if (this.collapsable) {
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
