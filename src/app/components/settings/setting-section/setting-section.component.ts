import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-setting-section',
  standalone: true,
  imports: [],
  templateUrl: './setting-section.component.html',
  styleUrl: './setting-section.component.scss',
})
export class SettingSectionComponent {
  @Input() title!: string;
}
