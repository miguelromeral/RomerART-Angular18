import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Drawing } from '@models/art/drawing.model';
import { DrawingScoreComponent } from '@app/components/drawings/drawing-score/drawing-score.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { IVoteDrawingResponse } from '@models/responses/vote-drawing-response.model';
import { finalize } from 'rxjs';
import { AlertService } from '@app/services/alerts/alert.service';
import { PartialErrorComponent } from '@app/components/common/errors/partial-error/partial-error.component';

@Component({
  selector: 'app-art-details-drawing-score-form',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    DrawingScoreComponent,
    ReactiveFormsModule,
    TranslateModule,
    CustomTranslatePipe,
    PartialErrorComponent,
  ],
  providers: [CustomTranslatePipe],
  templateUrl: './drawing-score-form.component.html',
  styleUrl: './drawing-score-form.component.scss',
})
export class DrawingScoreFormComponent extends LanguageComponent {
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
  sendingVote = false;
  errorSendingVote = false;
  voteSent = false;

  /* Vote Form */
  voteForm = new FormGroup({
    id: new FormControl(this.drawing?.id ?? ''),
    score: new FormControl(70),
  });

  constructor(
    private drawingService: DrawingService,
    private alertService: AlertService,
    private customTranslate: CustomTranslatePipe
  ) {
    super('SCREENS.DRAWING-DETAILS.SCORE-BOARD');
  }

  voteDrawing() {
    this.sendingVote = true;
    this.errorSendingVote = false;
    const data = this.voteForm.value;
    if (data.id && data.score) {
      this.drawingService
        .voteDrawing(data.id, data.score)
        .pipe(
          finalize(() => {
            this.sendingVote = false;
          })
        )
        .subscribe({
          next: resp => {
            this.errorSendingVote = false;
            this.voteSent = true;
            this.voteSubmitted.emit(resp);
          },
          error: () => {
            this.alertService.showSilentAlert(
              this.customTranslate,
              'ERRORS.DRAWING.VOTE',
              { id: this.drawing.id }
            );
            this.errorSendingVote = true;
          },
        });
    }
  }
}
