import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '@app/components/common/layout/layout/layout.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { Collection } from '@models/art/collection.model';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { CollectionFormComponent } from '@app/components/collections/collection-form/collection-form.component';
import { LanguageService } from '@app/services/language/language.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { CanComponentDeactivate } from '@app/guards/can-deactivate.guard';
import { AlertService } from '@app/services/alerts/alert.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-collection-create-screen',
  standalone: true,
  imports: [LayoutComponent, CommonModule, CollectionFormComponent],
  templateUrl: './collection-create-screen.component.html',
  styleUrl: './collection-create-screen.component.scss',
})
export class CollectionCreateScreenComponent
  extends LanguageComponent
  implements OnInit, CanComponentDeactivate
{
  collection: Collection = new Collection();

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
    this.setPageTitle(this.metadataService, this.languageService);
  }
}
