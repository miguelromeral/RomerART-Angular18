import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Drawing } from '@models/art/drawing.model';
import { Customization } from 'utils/customization';

@Component({
  selector: 'app-art-details-score-board',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.scss',
})
export class ScoreBoardComponent {
  @Input() drawing!: Drawing;
  showVoteForm = false;

  openVoteForm() {
    this.showVoteForm = true;
  }

  getClassScore(score: number) {
    return Customization.getClassScore(score);
  }

  onChangeRangeVote(event: Event): void {
    const target = event.target as HTMLInputElement;
    const score = parseInt(target.value, 10);
    const spScoreUser = $('#spScoreUser');

    spScoreUser.text(score.toString());

    spScoreUser.removeClass('bad mild good platinum');

    if (score < 50) {
      spScoreUser.addClass('bad');
    } else if (score < 65) {
      spScoreUser.addClass('mild');
    } else if (score < 95) {
      spScoreUser.addClass('good');
    } else if (score < 101) {
      spScoreUser.addClass('platinum');
    }
  }
}
