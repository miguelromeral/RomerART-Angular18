import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { Collection } from '@models/art/collection.model';
import { Drawing } from '@models/art/drawing.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SectionComponent } from '@app/components/shared/section/section.component';
import { TextInputComponent } from '@app/components/shared/inputs/text-input/text-input.component';
import { CollectionDrawingListComponent } from '@app/components/collections/collection-drawing-list/collection-drawing-list.component';
import { ISaveCollectionRequest } from '@models/requests/save-collection-request.model';
import { AlertService } from '@app/services/alerts/alert.service';
import { Router } from '@angular/router';
import { DrawingFilter } from '@models/art/drawing-filter.model';

@Component({
  selector: 'app-collection-form',
  standalone: true,
  imports: [
    TranslateModule,
    CustomTranslatePipe,
    LayoutComponent,
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    SectionComponent,
    TextInputComponent,
    CollectionDrawingListComponent,
    CollectionFormComponent,
  ],
  providers: [CustomTranslatePipe],
  templateUrl: './collection-form.component.html',
  styleUrl: './collection-form.component.scss',
})
export class CollectionFormComponent
  extends LanguageComponent
  implements OnInit
{
  private _id!: string;

  @Input() notFound: boolean | undefined;
  @Input() loading = true;
  @Input() newCollection = false;
  @Input()
  public get id() {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
    this.loadDrawings();
  }

  private _collection!: Collection;

  @Input()
  public get collection() {
    return this._collection;
  }
  public set collection(value: Collection) {
    this._collection = value;
    this.setFormValues(this.collection);
  }

  drawings: Drawing[] = [];

  listAll: Drawing[] = [];
  listUsed: Drawing[] = [];

  /* Form */
  form = new FormGroup({
    id: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    order: new FormControl(0),
    drawingIds: new FormControl<string[]>([], Validators.required),
  });

  /* Form Behaviour */
  duplicateId = false;

  constructor(
    private drawingService: DrawingService,
    private alertService: AlertService,
    private router: Router,
    private customTranslate: CustomTranslatePipe
  ) {
    super('SCREENS.COLLECTION-FORM');
  }

  ngOnInit() {
    this.loadDrawings();
  }

  loadDrawings() {
    const defaultFilters: DrawingFilter = new DrawingFilter({
      sortBy: 'date-desc',
    });
    this.drawingService
      .filterDrawingsAdmin(defaultFilters)
      .subscribe(results => {
        this.drawings = results.filteredDrawings;
        this.loadUsedDrawings();
      });
  }

  loadUsedDrawings() {
    if (this.collection) {
      const used: Drawing[] = [];
      this.collection.drawingIds.forEach(id => {
        const found = this.drawings.find(drawing => drawing.id === id);
        if (found) used.push(found);
      });
      this.listUsed = used;
      this.listAll = this.drawings.filter(
        drawing => this.listUsed.filter(x => x.id === drawing.id).length === 0
      );
    }
  }

  checkCollectionId(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.drawingService.checkCollectionId(value).subscribe({
      next: resp => {
        this.duplicateId = resp;
        if (this.duplicateId) {
          this.alertService.showAlert(
            this.customTranslate.transform(
              this.text('ALERTS.DUPLICATE-ID.TITLE')
            ),
            this.customTranslate.transform(
              this.text('ALERTS.DUPLICATE-ID.MESSAGE'),
              {
                id: value,
              }
            )
          );
          this.form.controls.id.setValue('');
        }
      },
      error: () => {
        this.alertService.showSilentAlert(
          this.customTranslate,
          'ERRORS.COLLECTION.FORM.CHECKID',
          { id: value }
        );
      },
    });
  }

  deleteCollection() {
    // TODO: cambiar estos hardcode strings a plantilla
    // TODO: arreglar que el showconfirm dialog no funciona
    if (this.alertService.showConfirmDialog('ELIMINAR?', 'SEGURO?', 'SÍ')) {
      this.drawingService.removeCollection(this.collection.id).subscribe({
        next: () => {
          this.alertService.showAlert('ELIMINADO', 'ELIMINADO');
          this.router.navigate([`/collections`]);
        },
        error: () => {
          this.alertService.showSilentAlert(
            this.customTranslate,
            'ERRORS.COLLECTION.FROM.REMOVE',
            { id: this.collection.id }
          );
        },
      });
    }
  }

  setFormValues(col: Collection) {
    if (col && col.id) {
      this.form.controls.id.setValue(col.id);
      this.form.controls.description.setValue(col.description);
      this.form.controls.name.setValue(col.name);
      this.form.controls.order.setValue(col.order);
      this.form.controls.drawingIds.setValue(col.drawingIds);
      this.loadUsedDrawings();
    }
  }

  drop(event: CdkDragDrop<Drawing[]>, listType: 'all' | 'used') {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      if (listType === 'all') {
        this.listAll = event.container.data;
        this.listUsed = event.previousContainer.data;
      } else {
        this.listUsed = event.container.data;
        this.listAll = event.previousContainer.data;
      }
    }
    // Actualizar los dibujos en el formulario
    this.form.controls.drawingIds.setValue(this.listUsed.map(d => d.id));
  }

  saveCollection() {
    const values = this.form.value;

    const formData: ISaveCollectionRequest = {
      id: values.id!,
      description: values.description!,
      drawingsIds: values.drawingIds!,
      name: values.name!,
      order: values.order!,
    };

    this.drawingService.saveCollection(formData).subscribe({
      next: resp => {
        this._collection.id = resp.id;
        this.newCollection = false;

        this.alertService.showAlert(
          this.customTranslate.transform(this.text('ALERTS.SAVED.TITLE')),
          this.customTranslate.transform(this.text('ALERTS.SAVED.MESSAGE'), {
            id: values.id,
          })
        );

        this.router.navigate([`/collections`]);
      },
      error: () => {
        this.alertService.showAlert(
          this.customTranslate.transform(
            this.text('ALERTS.ERROR-ON-SAVE.TITLE')
          ),
          this.customTranslate.transform(
            this.text('ALERTS.ERROR-ON-SAVE.MESSAGE'),
            { id: values.id }
          )
        );
      },
    });
  }
}
