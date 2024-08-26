import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { Collection } from '@models/art/collection.model';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { CollectionFormComponent } from '@app/components/collections/collection-form/collection-form.component';
import { LanguageService } from '@app/services/language/language.service';
import { LanguageComponent } from '@models/components/LanguageComponent';

@Component({
  selector: 'app-create-collection',
  standalone: true,
  imports: [LayoutComponent, CommonModule, CollectionFormComponent],
  templateUrl: './create-collection.component.html',
  styleUrl: './create-collection.component.scss',
})
export class CreateCollectionComponent
  extends LanguageComponent
  implements OnInit
{
  collection: Collection = new Collection();

  constructor(
    private drawingService: DrawingService,
    private metadataService: MetadataService,
    private languageService: LanguageService
  ) {
    super('SCREENS.COLLECTION-FORM');
  }

  ngOnInit() {
    this.setPageTitle(this.metadataService, this.languageService);
  }
}
