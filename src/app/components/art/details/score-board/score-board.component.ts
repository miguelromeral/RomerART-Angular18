import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Drawing } from '@models/art/drawing.model';
import { DrawingScoreComponent } from '../../drawing-score/drawing-score.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { IVoteDrawingResponse } from '@models/responses/vote-drawing-response.model';

@Component({
  selector: 'app-art-details-score-board',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    DrawingScoreComponent,
    ReactiveFormsModule,
    TranslateModule,
    CustomTranslatePipe,
  ],
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.scss',
})
export class ScoreBoardComponent extends LanguageComponent {
  private _drawing!: Drawing;

  @Input()
  public get drawing() {
    return this._drawing;
  }
  public set drawing(value: Drawing) {
    this._drawing = value;
    this.voteForm.controls.id.setValue(value.id);
  }

  @Output() voteSubmitted = new EventEmitter<IVoteDrawingResponse>();
  showVoteForm = true;

  /* Vote Form */
  voteForm = new FormGroup({
    id: new FormControl(this.drawing?.id ?? ''),
    score: new FormControl(70),
  });

  constructor(private drawingService: DrawingService) {
    super('SCREENS.DRAWING-DETAILS.SCORE-BOARD');
  }

  voteDrawing() {
    const data = this.voteForm.value;
    if (data.id && data.score) {
      this.drawingService.voteDrawing(data.id, data.score).subscribe(resp => {
        if (resp) {
          this.showVoteForm = false;
          this.voteSubmitted.emit(resp);
        }
      });
    }
  }
}
