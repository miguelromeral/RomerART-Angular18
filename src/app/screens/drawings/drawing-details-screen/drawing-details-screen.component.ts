import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from '@app/services/logger/logger.service';
import { Drawing } from '@models/art/drawing.model';
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { SpotifyTrackComponent } from '@app/components/common/spotify/spotify-track/spotify-track.component';
import { DrawingCommentComponent } from '@app/components/drawings/drawing-comment/drawing-comment.component';
import { DrawingCommentWrapperComponent } from '@app/components/drawings/drawing-comment-wrapper/drawing-comment-wrapper.component';
import { DrawingSectionComponent } from '@app/components/drawings/drawing-section/drawing-section.component';
import { DrawingImageComponent } from '@app/components/drawings/drawing-image/drawing-image.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { LayoutComponent } from '@app/components/common/layout/layout/layout.component';
import { DrawingScoreFormComponent } from '@app/components/drawings/drawing-score-form/drawing-score-form.component';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { DrawingTabPanelComponent } from '@app/components/drawings/drawing-tab-panel/drawing-tab-panel.component';
import { IVoteDrawingResponse } from '@models/responses/vote-drawing-response.model';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '@app/components/common/layout/loading/loading.component';
import { TranslatableComponent } from '@app/components/common/translatable/translatable.component';
import { LanguageService } from '@app/services/language/language.service';
import { DrawingInfoComponent } from '@app/components/drawings/drawing-info/drawing-info.component';
import { finalize } from 'rxjs';
import { AlertService } from '@app/services/alerts/alert.service';
import { PartialErrorComponent } from '@app/components/common/errors/partial-error/partial-error.component';

@Component({
  selector: 'app-drawing-details-screen',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    SpotifyTrackComponent,
    NgFor,
    NgClass,
    DrawingCommentComponent,
    DrawingCommentWrapperComponent,
    DrawingSectionComponent,
    RouterModule,
    DrawingImageComponent,
    LayoutComponent,
    DrawingScoreFormComponent,
    DrawingTabPanelComponent,
    TranslateModule,
    CustomTranslatePipe,
    LoadingComponent,
    TranslatableComponent,
    DrawingInfoComponent,
    PartialErrorComponent,
  ],
  templateUrl: './drawing-details-screen.component.html',
  styleUrl: './drawing-details-screen.component.scss',
  providers: [CustomTranslatePipe],
})
export class DrawingDetailsScreenComponent
  extends LanguageComponent
  implements OnInit
{
  @Input() id: string | null = null;
  drawing: Drawing = new Drawing();
  drawingNotFound = false;

  loading = true;

  constructor(
    private logger: LoggerService,
    private drawingService: DrawingService,
    private languageService: LanguageService,
    private alertService: AlertService,
    private metadataService: MetadataService,
    private customTranslate: CustomTranslatePipe
  ) {
    super('SCREENS.DRAWING-DETAILS');
  }

  ngOnInit() {
    this.loadDrawing();
  }

  loadDrawing() {
    if (this.id) {
      this.loading = true;
      this.drawingNotFound = false;
      this.drawingService
        .getDrawingDetails(this.id)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: data => {
            this.processresult(data);
          },
          error: () => {
            this.alertService.showSilentAlert(
              this.customTranslate,
              this.text('NOTFOUND.TITLE')
            );
            this.drawingNotFound = true;
          },
        });
    }
  }

  processresult(data: Drawing) {
    if (data) {
      this.drawingNotFound = false;
      // this.logger.log(data);
      this.drawing = new Drawing(data);

      this.setPageTitle(
        this.metadataService,
        this.languageService,
        this.drawing.pageTitle()
      );

      this.metadataService.updateMetadata(
        this.drawing.pageTitle(),
        this.drawing.title,
        this.drawing.urlThumbnail
      );

      // this.logger.log(this.drawing);
    } else {
      this.drawingNotFound = true;
    }
    this.loading = false;
  }

  receiveVoteSubmitted(results: IVoteDrawingResponse) {
    if (this.drawing) {
      this.drawing.votesPopular = results.newVotes;
      this.drawing.scorePopular = results.newScore;
      this.drawing.scorePopularHuman = results.newScoreHuman;
    }
  }
  receiveCheer(likes: number) {
    if (this.drawing) {
      this.drawing.likes = likes;
    }
  }
}
