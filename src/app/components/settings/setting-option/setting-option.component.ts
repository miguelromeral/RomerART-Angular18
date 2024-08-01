import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-setting-option',
  standalone: true,
  imports: [],
  templateUrl: './setting-option.component.html',
  styleUrl: './setting-option.component.scss',
})
export class SettingOptionComponent {
  @Input() title!: string;
  @Input() description!: string;
}
