import { CommonModule, NgClass, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ElementRef,
  ViewChild,
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

  @ViewChild('imageElement') imageElement!: ElementRef;
  initialDistance = 0;
  lastScale = 1;
  transform = '';
  initialTouchPosition = { x: 0, y: 0 }; // Declaración de la propiedad

  btnCheerId = 'btnCheer';

  @Output() submittedCheer = new EventEmitter<number>();

  constructor(
    private drawingService: DrawingService,
    private authService: AuthService,
    private router: Router,
    private customTranslate: CustomTranslatePipe
  ) {
    super('SCREENS.DRAWING-DETAILS');
  }

  ngOnInit() {
    this.loadLoggedUser();
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
    $('#divImgFull').toggleClass('fullscreen');
  }

  fullScreenImageOnKeyDown(event: KeyboardEvent) {
    if (event.key === 'F' || event.key === 'f') {
      this.fullScreenImage();
    }
  }

  formatoLegible(numero: number) {
    return TextUtils.formatoLegible(numero);
  }

  errorLoadingImage(drawingId: string) {
    // console.log('Drawing ID not loaded: ' + drawingId);
    const selector =
      ".mr-error-load-placeholder[data-error-drawing-id='" + drawingId + "']";
    //console.log(selector);
    $(selector).addClass('show');
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

  onTouchStart(event: TouchEvent) {
    if (event.touches.length === 2) {
      this.initialDistance = this.getDistance(event.touches);

      const rect = this.imageElement.nativeElement.getBoundingClientRect();
      const centerX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
      const centerY = (event.touches[0].clientY + event.touches[1].clientY) / 2;

      this.initialTouchPosition = {
        x: (centerX - rect.left) / rect.width,
        y: (centerY - rect.top) / rect.height,
      };

      // Set the transform-origin to the center of the pinch
      this.imageElement.nativeElement.style.transformOrigin = `${this.initialTouchPosition.x * 100}% ${this.initialTouchPosition.y * 100}%`;
    }
  }
  onTouchMove(event: TouchEvent) {
    if (event.touches.length === 2) {
      event.preventDefault();

      const currentDistance = this.getDistance(event.touches);
      let scale = (currentDistance / this.initialDistance) * this.lastScale;

      // Limitar la escala mínima a 1
      if (scale < 1) {
        scale = 1;
      }

      // Use requestAnimationFrame for smoother rendering
      requestAnimationFrame(() => {
        this.transform = `scale(${scale})`;
        this.imageElement.nativeElement.style.transform = this.transform;
      });
    }
  }

  onTouchEnd(event: TouchEvent) {
    if (event.touches.length < 2) {
      this.lastScale = 1;
      this.transform = 'scale(1)';
      // this.lastScale = this.getCurrentScale();
    }
  }

  getDistance(touches: TouchList): number {
    const [touch1, touch2] = [touches[0], touches[1]];
    const deltaX = touch2.clientX - touch1.clientX;
    const deltaY = touch2.clientY - touch1.clientY;
    const res = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return res;
  }
  getCurrentScale(): number {
    const transformMatrix = window
      .getComputedStyle(this.imageElement.nativeElement)
      .getPropertyValue('transform');

    if (transformMatrix === 'none') {
      return 1;
    }

    const matrixMatch = transformMatrix.match(/matrix\((.+)\)/);

    if (matrixMatch && matrixMatch[1]) {
      const matrixValues = matrixMatch[1].split(', ');
      const scaleX = parseFloat(matrixValues[0]);

      return isNaN(scaleX) ? 1 : scaleX;
    }

    return 1;
  }
}
