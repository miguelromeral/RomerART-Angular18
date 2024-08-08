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
export class CollectionThumbnailComponent
  extends LanguageComponent
  implements OnInit
{
  @Input() collection!: Collection;
  listDrawings: Drawing[] = [];

  get hasDrawings() {
    return this.listDrawings?.length > 0;
  }

  constructor(
    private drawingService: DrawingService,
    private router: Router
  ) {
    super('SCREENS.ADMIN.COLLECTIONS.LIST');
  }

  ngOnInit() {
    this.drawingService
      .getAllDrawingsOfCollection(this.collection.id)
      .subscribe(list => {
        this.listDrawings = list;
      });
  }

  goToEdit() {
    this.router.navigate([`/admin/collections/edit/${this.collection.id}`]);
  }
}
