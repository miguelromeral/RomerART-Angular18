import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawingThumbnailComponent } from '@app/components/art/drawing-thumbnail/drawing-thumbnail.component';
import { DrawingSliderComponent } from '@app/components/collections/drawing-slider/drawing-slider.component';
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
import { Subscription } from 'rxjs';
import { DrawingScoreComponent } from '../../../components/art/drawing-score/drawing-score.component';

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
    DrawingSliderComponent,
    DrawingScoreComponent,
  ],
  templateUrl: './search-collection.component.html',
  styleUrl: './search-collection.component.scss',
})
export class SearchCollectionComponent
  extends LanguageComponent
  implements OnInit
{
  listCollections: Collection[] = [];
  loadingCollections = true;

  selectedCollection: Collection | undefined;

  admin = false;

  constructor(
    private drawingService: DrawingService,
    private authService: AuthService,
    private metadataService: MetadataService,
    private languageService: LanguageService,
    private router: Router
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
  }
}
