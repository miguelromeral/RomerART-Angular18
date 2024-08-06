import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ff-hand-container',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ff-hand-container.component.html',
  styleUrl: './ff-hand-container.component.scss',
})
export class FfHandContainerComponent {
  @Input() behaviour: 'appear' | 'flicker' = 'appear';
}
