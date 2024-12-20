import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { SettingsService } from '@app/services/settings/settings.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import {
  settingMaxZoom,
  settingZoomImage,
} from 'config/settings/local-storage.config';

@Component({
  selector: 'app-zoom-image',
  standalone: true,
  imports: [CommonModule, TranslateModule, CustomTranslatePipe],
  templateUrl: './zoom-image.component.html',
  styleUrl: './zoom-image.component.scss',
})
export class ZoomImageComponent extends LanguageComponent implements OnInit {
  enableZoom = settingZoomImage.defaultValue;
  maxZoom = settingMaxZoom.defaultValue;

  private _url = '';

  @Input()
  public get url() {
    return this._url;
  }
  public set url(value: string) {
    this.error = false;
    this.initZoom();
    this._url = value;
  }

  @Output() imageNotFound = new EventEmitter<void>();

  @ViewChild('imageElement') imageElement!: ElementRef;
  initialDistance = 0;
  lastScale = 1;
  transform = '';
  initialTouchPosition = { x: 0, y: 0 };
  error = false;

  constructor(
    private settingsService: SettingsService,
    private renderer: Renderer2
  ) {
    super('COMPONENTS.IMAGE');
  }

  ngOnInit() {
    this.initZoom();
  }

  initZoom() {
    this.settingsService
      .booleanSetting$(settingZoomImage)
      .subscribe(enabled => {
        this.enableZoom = enabled;
      });

    this.settingsService.numberSetting$(settingMaxZoom).subscribe(value => {
      this.maxZoom = value;
    });
  }

  errorLoading() {
    this.error = true;
    this.enableZoom = false;
    this.imageNotFound.next();
  }

  onMouseEnter(event: MouseEvent) {
    if (!this.enableZoom) {
      return;
    }
    // Cuando el ratón entra, se hace zoom sobre la imagen
    this.renderer.setStyle(
      this.imageElement.nativeElement,
      'transition',
      'transform 0.3s ease-in-out'
    );
    this.scaleImage(event, this.maxZoom);
  }

  onMouseLeave() {
    if (!this.enableZoom) {
      return;
    }
    // Resetea el zoom al salir
    this.resetImageScale();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.enableZoom) {
      return;
    }
    // Permite mover el zoom entre la imagen
    this.scaleImage(event, this.maxZoom);
  }

  // Escala la imagen basada en la posición del ratón
  private scaleImage(event: MouseEvent, scale: number) {
    if (!this.enableZoom) {
      return;
    }

    const rect = this.imageElement.nativeElement.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const originX = (offsetX / rect.width) * 100;
    const originY = (offsetY / rect.height) * 100;

    this.renderer.setStyle(
      this.imageElement.nativeElement,
      'transform-origin',
      `${originX}% ${originY}%`
    );
    this.renderer.setStyle(
      this.imageElement.nativeElement,
      'transform',
      `scale(${scale})`
    );
    this.imageElement.nativeElement.style.zIndex = '10';
  }

  // Restablece la escala de la imagen
  private resetImageScale() {
    this.renderer.setStyle(
      this.imageElement.nativeElement,
      'transform',
      'scale(1)'
    );
  }

  onTouchStart(event: TouchEvent) {
    if (!this.enableZoom) {
      return;
    }

    if (event.touches.length === 2) {
      // Capturamos las coordenadas y calculamos el zoom
      this.initialDistance = this.getDistance(event.touches);

      const rect = this.imageElement.nativeElement.getBoundingClientRect();
      const centerX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
      const centerY = (event.touches[0].clientY + event.touches[1].clientY) / 2;

      this.initialTouchPosition = {
        x: (centerX - rect.left) / rect.width,
        y: (centerY - rect.top) / rect.height,
      };

      // Set transform-origin to the center of the pinch
      this.imageElement.nativeElement.style.transformOrigin = `${this.initialTouchPosition.x * 100}% ${this.initialTouchPosition.y * 100}%`;

      // Disable transition for immediate response
      this.imageElement.nativeElement.style.transition = 'none';
    }
  }
  onTouchMove(event: TouchEvent) {
    if (!this.enableZoom) {
      return;
    }
    if (event.touches.length === 2) {
      event.preventDefault();

      const currentDistance = this.getDistance(event.touches);
      let scale = (currentDistance / this.initialDistance) * this.lastScale;

      // Limitar la escala mínima a 1
      if (scale < 1) {
        scale = 1;
      }
      if (scale > this.maxZoom) {
        scale = this.maxZoom;
      }

      // Calcular la nueva posición media entre los dos dedos
      // Acedemos al padre, ya que la imagen se va a deformar con la escala
      const element = this.imageElement.nativeElement as HTMLElement;
      const rect = element.parentElement!.getBoundingClientRect();
      const centerX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
      const centerY = (event.touches[0].clientY + event.touches[1].clientY) / 2;

      const newTouchPosition = {
        x: (centerX - rect.left) / rect.width,
        y: (centerY - rect.top) / rect.height,
      };

      // Actualizar el origen de la transformación para seguir los dedos
      this.imageElement.nativeElement.style.transformOrigin =
        this.calculateTransformOriginTouchMove(
          newTouchPosition.x,
          newTouchPosition.y
        );
      this.imageElement.nativeElement.style.zIndex = '10';

      // Actualizar la transformación para mover y escalar la imagen
      requestAnimationFrame(() => {
        this.transform = `scale(${scale})`;
        this.imageElement.nativeElement.style.transform = this.transform;
      });
    }
  }

  calculateTransformOriginTouchMove(x: number, y: number): string {
    let xPerc = (1 - x) * 100;
    let yPerc = (1 - y) * 100;

    if (xPerc < 0) xPerc = 0;
    if (xPerc > 100) xPerc = 100;

    if (yPerc < 0) yPerc = 0;
    if (yPerc > 100) yPerc = 100;

    return `${xPerc}% ${yPerc}%`;
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.enableZoom) {
      return;
    }
    if (event.touches.length < 2) {
      this.lastScale = 1;
      this.transform = 'scale(1)';

      // Restore smooth transition after pinch ends
      this.imageElement.nativeElement.style.transition = 'transform 0.1s ease';
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
