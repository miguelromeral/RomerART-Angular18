import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { DrawingThumbnailComponent } from '@app/components/drawings/drawing-thumbnail/drawing-thumbnail.component';
import { Drawing } from '@models/art/drawing.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-collection-drawing-slider',
  standalone: true,
  imports: [CommonModule, DrawingThumbnailComponent],
  templateUrl: './collection-drawing-slider.component.html',
  styleUrl: './collection-drawing-slider.component.scss',
})
export class CollectionDrawingSliderComponent implements OnInit, OnDestroy {
  private _drawings: Drawing[] = [];

  @Input()
  public get drawings() {
    return this._drawings;
  }
  public set drawings(value: Drawing[]) {
    this._drawings = value;
    this.startSlider();
  }

  private touchStartX = 0;
  private touchEndX = 0;
  activeIndex = 0;
  milisToChangeSlide = 5000;
  manualChangeSlide = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  private intervalSubscription: Subscription | undefined;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.intervalSubscription = interval(this.milisToChangeSlide).subscribe(
        () => {
          this.nextSlide(false);
        }
      );
    }
  }

  startSlider() {
    this.activeIndex = 0;
    this.manualChangeSlide = false;
  }

  nextSlide(manual = true) {
    if (manual || !this.manualChangeSlide) {
      if (this.activeIndex >= this.drawings.length - 1) this.activeIndex = 0;
      else this.activeIndex++;
    }

    if (manual) {
      this.manualChangeSlide = true;
    }
  }

  prevSlide() {
    if (this.activeIndex <= 0) {
      this.activeIndex = this.drawings.length - 1;
    } else {
      this.activeIndex--;
    }

    this.manualChangeSlide = true;
  }

  getDrawingStyle(index: number): object {
    const stt = index - this.activeIndex;

    let rotateY = '0deg';
    if (stt < 0) {
      rotateY = '1deg'; // Rotación para los elementos a la izquierda
    } else if (stt > 0) {
      rotateY = '-1deg'; // Rotación para los elementos a la derecha
    }

    let scale = 1 - 0.2 * Math.abs(stt);
    if (scale < 0) scale = 0;

    return {
      transform: `translateX(${120 * stt}px) scale(${scale}) perspective(16px) rotateY(${rotateY})`,
      zIndex: -Math.abs(stt),
      filter: stt === 0 ? 'none' : 'blur(5px)',
      // opacity: Math.abs(stt) > 2 ? 1 : 0.6,
    };
  }

  ngOnDestroy() {
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchMove(event: TouchEvent) {
    // Puedes opcionalmente manejar el evento touchmove aquí si quieres más control
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeGesture();
  }

  handleSwipeGesture() {
    const swipeThreshold = 50; // Ajusta este valor según sea necesario
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (swipeDistance > swipeThreshold) {
      // Deslizó a la derecha
      this.prevSlide();
    } else if (swipeDistance < -swipeThreshold) {
      // Deslizó a la izquierda
      this.nextSlide();
    }
  }
}
