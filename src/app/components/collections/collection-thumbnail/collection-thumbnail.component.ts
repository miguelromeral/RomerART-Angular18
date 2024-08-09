import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawingThumbnailComponent } from '@app/components/art/drawing-thumbnail/drawing-thumbnail.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { Collection } from '@models/art/collection.model';
import { Drawing } from '@models/art/drawing.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-collection-thumbnail',
  standalone: true,
  imports: [
    CommonModule,
    DrawingThumbnailComponent,
    CustomTranslatePipe,
    TranslateModule,
  ],
  templateUrl: './collection-thumbnail.component.html',
  styleUrl: './collection-thumbnail.component.scss',
})
export class CollectionThumbnailComponent extends LanguageComponent {
  @Input() collection!: Collection;

  get hasDrawings() {
    return this.collection.drawings?.length > 0;
  }
  get drawings() {
    return this.collection.drawings;
  }

  constructor(private router: Router) {
    super('SCREENS.ADMIN.COLLECTIONS.LIST');
  }

  goToEdit() {
    this.router.navigate([`/admin/collections/edit/${this.collection.id}`]);
  }
}
