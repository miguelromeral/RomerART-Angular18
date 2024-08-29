import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-setting-option',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './setting-option.component.html',
  styleUrl: './setting-option.component.scss',
})
export class SettingOptionComponent {
  @Input() icon = '';
  @Input() title!: string;
  @Input() description!: string;
}
