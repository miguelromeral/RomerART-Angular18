import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from '../../../services/logger/logger.service';
import { Drawing } from '../../../../models/art/drawing.model';
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { TitleComponent } from '../../../components/art/details/title/title.component';
import { TrackComponent } from '../../../components/spotify/track/track.component';
import { CommentComponent } from '@app/components/art/details/comment/comment.component';
import { CommentWrapperComponent } from '@app/components/art/details/comment-wrapper/comment-wrapper.component';
import { SectionComponent } from '@app/components/art/details/section/section.component';
import { ImageComponent } from '@app/components/art/details/image/image.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { ScoreBoardComponent } from '@app/components/art/details/score-board/score-board.component';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { ArtSectionType } from 'config/art/art-section.config';
import { TabPanelComponent } from '@app/components/shared/tab-panel/tab-panel.component';
import { TabPanelItem } from '@models/components/tab-panel-item.model';
import { ArtInfoTabsConfig } from 'config/art/art-info-tabs.config';
import { IVoteDrawingResponse } from '@models/responses/vote-drawing-response.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    TitleComponent,
    TrackComponent,
    NgFor,
    NgClass,
    CommentComponent,
    CommentWrapperComponent,
    SectionComponent,
    ImageComponent,
    LayoutComponent,
    ScoreBoardComponent,
    TabPanelComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  @Input() id: string | null = null;
  drawing: Drawing | undefined;
  drawingNotFound: boolean | undefined;

  panelTabs: TabPanelItem[] = ArtInfoTabsConfig.tabs;

  constructor(
    private logger: LoggerService,
    private drawingService: DrawingService,
    private metadataService: MetadataService
  ) {}

  ngOnInit() {
    this.loadDrawing();
  }

  loadDrawing() {
    if (this.id) {
      this.drawingService.getDrawingDetails(this.id).subscribe(data => {
        if (data) {
          // this.logger.log(data);
          this.drawing = new Drawing(data);
          this.metadataService.updateMetadata(
            this.drawing.pageTitle(),
            this.drawing.title,
            this.drawing.urlThumbnail
          );

          this.panelTabs = ArtInfoTabsConfig.getTabs(/*this.drawing*/);
          // this.logger.log(this.drawing);
        }
        this.drawingNotFound = data === undefined || data.id === '';
      });
    }
  }

  getProductSectionType(): ArtSectionType {
    switch (this.drawing?.productType) {
      case 1:
        return 'game';
      case 2:
        return 'actor';
      case 3:
        return 'singer';
      case 4:
        return 'sportman';
      default:
        return '';
    }
  }

  receiveVoteSubmitted(results: IVoteDrawingResponse) {
    if (this.drawing) {
      this.drawing.votesPopular = results.newVotes;
      this.drawing.scorePopular = results.newScore;
      this.drawing.scorePopularHuman = results.newScoreHuman;
    }
  }
}
