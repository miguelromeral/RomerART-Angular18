import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionThumbnailComponent } from '@app/components/collections/collection-thumbnail/collection-thumbnail.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { Collection } from '@models/art/collection.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-collection-list',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CustomTranslatePipe,
    LayoutComponent,
    CollectionThumbnailComponent,
  ],
  templateUrl: './collection-list.component.html',
  styleUrl: './collection-list.component.scss',
})
export class CollectionListComponent
  extends LanguageComponent
  implements OnInit
{
  listCollections: Collection[] = [];

  constructor(
    private drawingService: DrawingService,
    private router: Router
  ) {
    super('SCREENS.ADMIN.COLLECTIONS.LIST');
  }

  ngOnInit() {
    this.drawingService.getAllCollections().subscribe(list => {
      this.listCollections = list
        .map(c => new Collection(c))
        .sort((a, b) => b.order - a.order);
    });
  }

  createNewCollection() {
    this.router.navigate(['admin/collections/create']);
  }
}
