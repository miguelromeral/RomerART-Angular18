import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SelectInputComponent } from '@app/components/shared/inputs/select-input/select-input.component';
import { SwitchComponent } from '@app/components/shared/inputs/switch/switch.component';
import { TextInputComponent } from '@app/components/shared/inputs/text-input/text-input.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { LoadingComponent } from '@app/components/shared/loading/loading.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { LoggerService } from '@app/services/logger/logger.service';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { DrawingPaperSize } from '@models/art/drawing-paper-size.model';
import { DrawingSoftware } from '@models/art/drawing-software.model';
import { DrawingStyle } from '@models/art/drawing-style.model';
import { Drawing } from '@models/art/drawing.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { DrawingScoreComponent } from '../drawing-score/drawing-score.component';
import { DrawingProductType } from '@models/art/drawing-product-type.model';
import { DrawingFormCommentsComponent } from '../drawing-form-comments/drawing-form-comments.component';
import { DateInputComponent } from '@app/components/shared/inputs/date-input/date-input.component';

@Component({
  selector: 'app-drawing-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CustomTranslatePipe,
    LayoutComponent,
    LoadingComponent,
    RouterLink,
    SwitchComponent,
    ReactiveFormsModule,
    TextInputComponent,
    SelectInputComponent,
    DrawingScoreComponent,
    DrawingFormCommentsComponent,
    DateInputComponent,
  ],
  templateUrl: './drawing-form.component.html',
  styleUrl: './drawing-form.component.scss',
})
export class DrawingFormComponent extends LanguageComponent {
  private _drawing!: Drawing;

  @Input()
  public get drawing() {
    return this._drawing;
  }
  public set drawing(value: Drawing) {
    this._drawing = value;
    console.log('Drawing:', value);
    this.setFormValues(value);
  }

  @Input() drawingNotFound: boolean | undefined;
  @Input() loading = true;
  @Input() newDrawing!: boolean;

  form = new FormGroup({
    isEditing: new FormControl(this.newDrawing, Validators.required),
    id: new FormControl('', Validators.required),
    path: new FormControl('', Validators.required),
    pathThumbnail: new FormControl('', Validators.required),
    title: new FormControl(''),
    favorite: new FormControl(false, Validators.required),
    name: new FormControl(''),
    modelName: new FormControl(''),
    type: new FormControl(0, Validators.required),
    software: new FormControl(0),
    paper: new FormControl(0),
    dateHyphen: new FormControl('', Validators.required),
    scoreCritic: new FormControl(0),
    time: new FormControl(0),
    productType: new FormControl(0, Validators.required),
    productName: new FormControl(''),
    listComments: new FormArray<FormControl>([]),
    listCommentPros: new FormArray<FormControl>([]),
    listCommentCons: new FormArray<FormControl>([]),
    tagsText: new FormControl(''),
    referenceUrl: new FormControl(''),
    spotifyUrl: new FormControl(''),
  });

  get listComments(): FormArray<FormControl> {
    return this.form.controls.listComments as FormArray<FormControl>;
  }
  get listCommentPros(): FormArray<FormControl> {
    return this.form.controls.listCommentPros as FormArray<FormControl>;
  }
  get listCommentCons(): FormArray<FormControl> {
    return this.form.controls.listCommentCons as FormArray<FormControl>;
  }

  listDrawingStyles: DrawingStyle[] = [];
  listDrawingSoftwares: DrawingSoftware[] = [];
  listDrawingPapers: DrawingPaperSize[] = [];
  listDrawingProductTypes: DrawingProductType[] = [];

  constructor(
    private logger: LoggerService,
    private drawingService: DrawingService,
    private metadataService: MetadataService
  ) {
    super('SCREENS.DRAWING-FORM');
    this.listDrawingStyles = this.drawingService.getDrawingStyles();
    this.listDrawingSoftwares = this.drawingService.getDrawingSoftwares();
    this.listDrawingPapers = this.drawingService.getDrawingPaperSizes();
    this.listDrawingProductTypes = this.drawingService.getDrawingProductTypes();
  }

  setFormValues(drawing: Drawing) {
    this.form.controls.id.setValue(drawing.id);
    this.form.controls.path.setValue(drawing.path);
    this.form.controls.pathThumbnail.setValue(drawing.pathThumbnail);
    this.form.controls.title.setValue(drawing.title);
    this.form.controls.favorite.setValue(drawing.favorite);
    this.form.controls.name.setValue(drawing.name);
    this.form.controls.modelName.setValue(drawing.modelName);
    this.form.controls.type.setValue(drawing.type);
    this.form.controls.software.setValue(drawing.software);
    this.form.controls.paper.setValue(drawing.paper);
    this.form.controls.dateHyphen.setValue(drawing.dateHyphen);
    this.form.controls.scoreCritic.setValue(drawing.scoreCritic);
    this.form.controls.time.setValue(drawing.time);
    this.form.controls.productType.setValue(drawing.productType);
    this.form.controls.productName.setValue(drawing.productName);
    this.form.controls.tagsText.setValue(drawing.tags.join(' '));
    this.form.controls.referenceUrl.setValue(drawing.referenceUrl);
    this.form.controls.spotifyUrl.setValue(drawing.spotifyUrl);
  }

  checkAzurePath(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.drawingService.checkAzurePath(value).subscribe(resp => {
      console.log('Respuesta: ', resp);
    });
  }

  loadImagePath() {
    // TODO: Implementar la lógica de la subida a Azure
    console.log('Comprobando Imagen');
  }

  saveDrawing() {
    console.log(this.form.value);
    this.drawingService.saveDrawing(this.drawing).subscribe(resp => {
      console.log('Respuesta: ', resp);
    });
  }
}
