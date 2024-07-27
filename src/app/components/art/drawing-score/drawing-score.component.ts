import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Customization } from '@utils/customization';

@Component({
  selector: 'app-drawing-score',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './drawing-score.component.html',
  styleUrl: './drawing-score.component.scss',
})
export class DrawingScoreComponent {
  @Input() popular = false;
  @Input() score!: number;

  getClassScore(score: number) {
    return Customization.getClassScore(score);
  }
}
