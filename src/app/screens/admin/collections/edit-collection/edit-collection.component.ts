import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'app-edit-collection',
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
  ],
  templateUrl: './edit-collection.component.html',
  styleUrl: './edit-collection.component.scss',
})
export class EditCollectionComponent extends LanguageComponent {
  private _id!: string;

  @Input() newCollection!: boolean;
  @Input()
  public get id() {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
    this.loadForm();
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
    isEditing: new FormControl(this.newCollection, Validators.required),
    id: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    order: new FormControl(0),
    drawingsIds: new FormControl<string[]>([], Validators.required),
  });

  /* Form Behaviour */
  loadingCollection = true;

  constructor(private drawingService: DrawingService) {
    super('SCREENS.ADMIN.COLLECTIONS.EDIT');
  }

  loadForm() {
    // TODO: crear acción para recuperar solo una colección por su ID
    this.drawingService.getCollectionDetails(this.id).subscribe(col => {
      this.collection = col;
      this.loadingCollection = false;
      this.setFormValues(this.collection);

      this.drawingService.getAllDrawings().subscribe(list => {
        this.drawings = list;
        this.listUsed = this.drawings.filter(drawing =>
          this.collection?.drawingsId.find(id => id === drawing.id)
        );
        this.listAll = this.drawings.filter(
          drawing => this.listUsed.filter(x => x.id === drawing.id).length === 0
        );
      });
    });
  }

  setFormValues(col: Collection) {
    this.form.controls.id.setValue(col.id);
    this.form.controls.description.setValue(col.description);
    this.form.controls.name.setValue(col.name);
    this.form.controls.order.setValue(col.order);
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
      // Actualizar los dibujos en el formulario
      this.form.controls.drawingsIds.setValue(this.listUsed.map(d => d.id));
    }
  }

  saveCollection() {
    console.log(this.form.value);
    const values = this.form.value;

    // const formData: ISaveDrawingRequest = {
    //   id: values.id!,
    //   dateHyphen: values.dateHyphen!,
    //   favorite: values.favorite!,
    //   isEditing: values.isEditing!,
    //   listCommentCons: values.listCommentCons!,
    //   listCommentPros: values.listCommentPros!,
    //   listComments: values.listComments!,
    //   modelName: values.modelName!,
    //   name: values.name!,
    //   paper: values.paper!,
    //   path: values.path!,
    //   pathThumbnail: values.pathThumbnail!,
    //   productName: values.productName!,
    //   productType: values.productType!,
    //   referenceUrl: values.referenceUrl!,
    //   scoreCritic: values.scoreCritic!,
    //   software: values.software!,
    //   spotifyUrl: values.spotifyUrl!,
    //   tagsText: values.tagsText!,
    //   time: values.time!,
    //   title: values.title!,
    //   type: values.type!,
    //   visible: values.visible!,
    // };
    // this.drawingService.saveDrawing(formData).subscribe(resp => {
    //   // console.log('Respuesta: ', resp);
    //   if (resp) {
    //     this.newDrawing = false;
    //     this.form.controls.isEditing.setValue(true);
    //     this.form.controls.tagsText.setValue(resp.tagsText);

    //     this.alertService.showAlert(
    //       this.customTranslate.transform(this.text('ALERTS.SAVED.TITLE')),
    //       this.customTranslate.transform(this.text('ALERTS.SAVED.MESSAGE'), {
    //         id: values.id,
    //       })
    //     );
    //   } else {
    //     this.alertService.showAlert(
    //       this.customTranslate.transform(
    //         this.text('ALERTS.ERROR-ON-SAVE.TITLE')
    //       ),
    //       this.customTranslate.transform(
    //         this.text('ALERTS.ERROR-ON-SAVE.MESSAGE'),
    //         { id: values.id }
    //       )
    //     );
    //   }
    // });
  }
}
