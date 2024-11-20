import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Customization } from '@utils/customization';
import { scoreConfig } from 'config/art/art-details-form.config';

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

  scoreConfig = scoreConfig;

  getClassScore(score: number) {
    return Customization.getClassScore(score);
  }
}
