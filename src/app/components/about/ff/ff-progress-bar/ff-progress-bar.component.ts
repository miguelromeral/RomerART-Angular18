import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ff-progress-bar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ff-progress-bar.component.html',
  styleUrl: './ff-progress-bar.component.scss',
})
export class FfProgressBarComponent {
  @Input() maxPoints!: number;
  @Input() points!: number;
  @Input() type!: 'health' | 'magic';
}
