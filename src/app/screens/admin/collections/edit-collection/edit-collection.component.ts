import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { Collection } from '@models/art/collection.model';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { CollectionFormComponent } from '@app/components/collections/collection-form/collection-form.component';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { LanguageService } from '@app/services/language/language.service';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from '@app/guards/can-deactivate.guard';
import { AlertService } from '@app/services/alerts/alert.service';

@Component({
  selector: 'app-edit-collection',
  standalone: true,
  imports: [LayoutComponent, CommonModule, CollectionFormComponent],
  templateUrl: './edit-collection.component.html',
  styleUrl: './edit-collection.component.scss',
})
export class EditCollectionComponent
  extends LanguageComponent
  implements OnInit, CanComponentDeactivate
{
  @Input() id: string | null = null;
  collection: Collection = new Collection();
  notFound: boolean | undefined;
  loading = true;

  constructor(
    private drawingService: DrawingService,
    private metadataService: MetadataService,
    private languageService: LanguageService,
    private alertService: AlertService
  ) {
    super('SCREENS.COLLECTION-FORM');
  }

  canDeactivate(): boolean | Observable<boolean> {
    return this.alertService.showConfirmDialog(
      '¿Salir?',
      '¿Desea salir? Perderá todos los cambios sin guardar',
      'Salir',
      'Quedarme'
    );
  }

  ngOnInit() {
    this.loadCollection();
  }

  loadCollection() {
    if (this.id) {
      this.drawingService.getCollectionDetailsAdmin(this.id).subscribe(data => {
        if (data) {
          this.collection = new Collection(data);
          this.setPageTitle(
            this.metadataService,
            this.languageService,
            this.collection.name
          );

          this.metadataService.updateMetadata(
            this.collection.name,
            this.collection.name,
            ''
          );
        } else {
          this.notFound = true;
        }
        this.loading = false;
      });
    }
  }
}
