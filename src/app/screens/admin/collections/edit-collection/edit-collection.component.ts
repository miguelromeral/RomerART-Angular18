import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { Collection } from '@models/art/collection.model';
import { Drawing } from '@models/art/drawing.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-collection',
  standalone: true,
  imports: [
    TranslateModule,
    CustomTranslatePipe,
    LayoutComponent,
    CommonModule,
  ],
  templateUrl: './edit-collection.component.html',
  styleUrl: './edit-collection.component.scss',
})
export class EditCollectionComponent
  extends LanguageComponent
  implements OnInit
{
  @Input() id: string | null = null;
  collection: Collection | undefined;
  drawings: Drawing[] = [];

  constructor(private drawingService: DrawingService) {
    super('SCREENS.ADMIN.COLLECTIONS.EDIT');
  }

  ngOnInit() {
    // TODO: crear acción para recuperar solo una colección por su ID
    this.drawingService.getAllCollections().subscribe(list => {
      this.collection = list.find(c => c.id === this.id);
    });
    this.drawingService.getAllDrawings().subscribe(list => {
      this.drawings = list;
    });
  }
}
