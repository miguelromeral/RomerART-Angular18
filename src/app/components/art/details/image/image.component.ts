import { CommonModule, NgClass, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Drawing } from '@models/art/drawing.model';
import { ScoreBoardComponent } from '../score-board/score-board.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { HeartUtils } from 'utils/customization/heart-utils';
import { TextUtils } from 'utils/customization/text-utils';
import { DrawingScoreComponent } from '../../drawing-score/drawing-score.component';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LoadingComponent } from '@app/components/shared/loading/loading.component';
import { TitleComponent } from '../title/title.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/services/api/auth/auth.service';
import { heartsAnimationConfig } from 'config/customization/heart-animation.config';
import { ZoomImageComponent } from '@app/components/shared/zoom-image/zoom-image.component';
import {
  settingShowFlipButton,
  settingShowFullScreen,
  settingShowKudos,
  settingShowScoreCritic,
  settingShowScorePopular,
} from 'config/settings/local-storage.config';
import { SettingsService } from '@app/services/settings/settings.service';

@Component({
  selector: 'app-art-details-image',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    CommonModule,
    ScoreBoardComponent,
    DrawingScoreComponent,
    TranslateModule,
    CustomTranslatePipe,
    LoadingComponent,
    TitleComponent,
    RouterLink,
    ZoomImageComponent,
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
  providers: [CustomTranslatePipe],
})
export class ImageComponent extends LanguageComponent implements OnInit {
  private _drawing!: Drawing;

  @Input() loading = true;

  @Input()
  public get drawing() {
    return this._drawing;
  }
  public set drawing(value: Drawing) {
    this._drawing = value;
  }

  admin = false;
  showBtnFullScreen = settingShowFullScreen.defaultValue;
  isFullScreen = false;
  showKudos = settingShowKudos.defaultValue;
  showScoreCritic = settingShowScoreCritic.defaultValue;
  showScorePopular = settingShowScorePopular.defaultValue;
  showFlip = settingShowFlipButton.defaultValue;

  btnCheerId = 'btnCheer';

  @Output() submittedCheer = new EventEmitter<number>();

  constructor(
    private drawingService: DrawingService,
    private authService: AuthService,
    private router: Router,
    private customTranslate: CustomTranslatePipe,
    private settingsService: SettingsService,
    private renderer: Renderer2
  ) {
    super('SCREENS.DRAWING-DETAILS');
  }

  ngOnInit() {
    this.loadLoggedUser();
    this.settingsService.booleanSetting$(settingShowKudos).subscribe(show => {
      this.showKudos = show;
    });
    this.settingsService
      .booleanSetting$(settingShowScoreCritic)
      .subscribe(show => {
        this.showScoreCritic = show;
      });
    this.settingsService
      .booleanSetting$(settingShowScorePopular)
      .subscribe(show => {
        this.showScorePopular = show;
      });
    this.settingsService
      .booleanSetting$(settingShowFullScreen)
      .subscribe(show => {
        this.showBtnFullScreen = show;
      });
    this.settingsService
      .booleanSetting$(settingShowFlipButton)
      .subscribe(show => {
        this.showFlip = show;
      });
  }

  loadLoggedUser() {
    this.authService.loggedUser$.subscribe(user => {
      this.admin = user ? this.authService.isAdmin(user) : false;
    });
  }

  cheerDrawing(event: MouseEvent) {
    $('#' + this.btnCheerId).attr('disabled', 'true');
    $('#iCheerIcon').addClass('bi-heart-fill');
    $('#iCheerIcon').removeClass('bi-heart');

    const element = document.createElement('div');
    element.innerHTML = HeartUtils.obtenerMensajeAleatorio();

    element.style.left = event.pageX - 20 + 'px';
    element.style.top = event.pageY + 'px';
    element.style.position = 'absolute';
    element.classList.add('mr-thanks-message', 'dissapear-message-thanks');
    document.body.appendChild(element);

    setTimeout(() => {
      element.remove();
    }, heartsAnimationConfig.duration.max * 1000);

    HeartUtils.showHearts();

    this.drawingService.cheerDrawing(this.drawing.id).subscribe({
      next: () => {
        this.submittedCheer.emit(this.drawing?.likes + 1);
      },
      error: err => console.error('Error al enviar cheer:', err),
      complete: () => {
        $('#' + this.btnCheerId).removeAttr('disabled');
      },
    });
  }

  fullScreenImage() {
    if (this.isFullScreen) {
      $('#divImgFull').removeClass('fullscreen');
    } else {
      $('#divImgFull').addClass('fullscreen');
    }
    this.isFullScreen = !this.isFullScreen;
  }

  formatoLegible(numero: number) {
    return TextUtils.formatoLegible(numero);
  }

  shareDrawing() {
    if (navigator.share) {
      const title = this.drawing.pageTitle();
      const text = this.customTranslate.transform(this.text('SHARE.TEXT'), {
        title: this.drawing.pageTitle(),
      });
      navigator
        .share({
          title: title,
          text: text,
          url: window.location.href,
        })
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(error => {
          console.error('Error sharing', error);
        });
    } else {
      console.error('Web Share API not supported in your browser.');
    }
  }

  editDrawing() {
    this.router.navigate([`/art/edit/${this.drawing.id}`]);
  }

  flipDrawing() {
    $('#divImgFull img').toggleClass('flipped');
  }
}
