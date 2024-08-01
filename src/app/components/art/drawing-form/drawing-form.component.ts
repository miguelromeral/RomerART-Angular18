import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { LoadingComponent } from '@app/components/shared/loading/loading.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { LoggerService } from '@app/services/logger/logger.service';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { Drawing } from '@models/art/drawing.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';

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
    ReactiveFormsModule,
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
    id: new FormControl('', Validators.required),
    path: new FormControl('', Validators.required),
    pathThumbnail: new FormControl('', Validators.required),
    title: new FormControl(''),
    favorite: new FormControl(false, Validators.required),
  });

  constructor(
    private logger: LoggerService,
    private drawingService: DrawingService,
    private metadataService: MetadataService
  ) {
    super('SCREENS.DRAWING-FORM');

    console.log(this.drawing);
  }

  setFormValues(drawing: Drawing) {
    this.form.controls.id.setValue(drawing.id);
    this.form.controls.path.setValue(drawing.path);
    this.form.controls.pathThumbnail.setValue(drawing.pathThumbnail);
    this.form.controls.title.setValue(drawing.title);
    this.form.controls.favorite.setValue(drawing.favorite);
  }

  loadImagePath() {
    // TODO: Implementar la lógica de la subida a Azure
    console.log('Comprobando Imagen');
  }

  saveDrawing() {
    console.log(this.form.value);
  }
}
