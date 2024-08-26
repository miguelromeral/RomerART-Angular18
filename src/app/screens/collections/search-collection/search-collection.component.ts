import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { DrawingThumbnailComponent } from '@app/components/art/drawing-thumbnail/drawing-thumbnail.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { LoadingComponent } from '@app/components/shared/loading/loading.component';
import { TranslatableComponent } from '@app/components/shared/translatable/translatable.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AuthService } from '@app/services/api/auth/auth.service';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { LanguageService } from '@app/services/language/language.service';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { Collection } from '@models/art/collection.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { sortCollectionsByOrder } from '@utils/sorting/sort-utils';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-collection',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LoadingComponent,
    CustomTranslatePipe,
    LayoutComponent,
    TranslatableComponent,
    DrawingThumbnailComponent,
  ],
  templateUrl: './search-collection.component.html',
  styleUrl: './search-collection.component.scss',
})
export class SearchCollectionComponent
  extends LanguageComponent
  implements OnInit, OnDestroy
{
  listCollections: Collection[] = [];
  loadingCollections = true;

  selectedCollection: Collection | undefined;
  activeIndex = 0;
  milisToChangeSlide = 5000;
  manualChangeSlide = false;

  admin = false;

  private touchStartX = 0;
  private touchEndX = 0;

  constructor(
    private drawingService: DrawingService,
    private authService: AuthService,
    private metadataService: MetadataService,
    private languageService: LanguageService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    super('SCREENS.COLLECTIONS');
  }

  private intervalSubscription: Subscription | undefined;

  ngOnInit() {
    this.setPageTitle(this.metadataService, this.languageService);
    this.authService.loggedUser$.subscribe(user => {
      this.admin = user ? this.authService.isAdmin(user) : false;
    });
    this.drawingService.getAllCollections().subscribe(list => {
      if (list) {
        this.listCollections = list
          .filter(c => c.drawingsId.length > 0)
          .sort(sortCollectionsByOrder);
        if (list.length > 0) this.selectCollection(this.listCollections[0].id);
        this.loadingCollections = false;

        if (isPlatformBrowser(this.platformId)) {
          this.intervalSubscription = interval(
            this.milisToChangeSlide
          ).subscribe(() => {
            this.nextSlide(false);
          });
        }
      }
    });
  }

  createNewCollection() {
    this.router.navigate(['/collections/create']);
  }

  editCollection(id: string) {
    this.router.navigate(['/collections/edit/' + id]);
  }

  isCollectionSelected(id: string) {
    return this.selectedCollection?.id === id;
  }

  selectCollection(id: string) {
    this.selectedCollection = this.listCollections.find(x => x.id === id);
    this.activeIndex = 0;
    this.manualChangeSlide = false;
  }

  nextSlide(manual = true) {
    if (this.selectedCollection) {
      if (manual || !this.manualChangeSlide) {
        if (this.activeIndex >= this.selectedCollection.drawingsId.length - 1)
          this.activeIndex = 0;
        else this.activeIndex++;
      }

      if (manual) {
        this.manualChangeSlide = true;
      }
    }
  }

  prevSlide() {
    if (this.selectedCollection) {
      if (this.activeIndex <= 0) {
        this.activeIndex = this.selectedCollection.drawingsId.length - 1;
      } else {
        this.activeIndex--;
      }

      this.manualChangeSlide = true;
    }
  }

  getDrawingStyle(index: number): object {
    const stt = index - this.activeIndex;

    let rotateY = '0deg';
    if (stt < 0) {
      rotateY = '1deg'; // Rotación para los elementos a la izquierda
    } else if (stt > 0) {
      rotateY = '-1deg'; // Rotación para los elementos a la derecha
    }

    return {
      transform: `translateX(${120 * stt}px) scale(${1 - 0.2 * Math.abs(stt)}) perspective(16px) rotateY(${rotateY})`,
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
