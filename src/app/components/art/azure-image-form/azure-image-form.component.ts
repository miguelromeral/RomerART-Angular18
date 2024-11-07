import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInputComponent } from '@app/components/shared/inputs/text-input/text-input.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AlertService } from '@app/services/alerts/alert.service';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { UploadAzureImageResponse } from '@models/responses/upload-azure-image.response';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-azure-image-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    TranslateModule,
    CustomTranslatePipe,
    CommonModule,
    NgFor,
  ],
  providers: [CustomTranslatePipe],
  templateUrl: './azure-image-form.component.html',
  styleUrl: './azure-image-form.component.scss',
})
export class AzureImageFormComponent extends LanguageComponent {
  private _path = '';

  @Input()
  public get path() {
    return this._path;
  }
  public set path(value: string) {
    this._path = value;
    this.init();
  }
  @Output() imageUploaded = new EventEmitter<UploadAzureImageResponse>();
  isBeingUploaded = false;

  constructor(
    private drawingService: DrawingService,
    private alertService: AlertService,
    private customTranslate: CustomTranslatePipe
  ) {
    super('SCREENS.DRAWING-FORM');
  }

  azureImageForm = new FormGroup({
    size: new FormControl(350, [Validators.required, Validators.min(100)]),
    path: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    image: new FormControl('', Validators.required),
  });

  init() {
    this.azureImageForm.controls.path.setValue(this.path);
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.azureImageForm.patchValue({
        image: file,
      });
    }
  }

  uploadImage() {
    if (!this.azureImageForm.valid) {
      return;
    }

    const value = this.azureImageForm.value;
    if (!value.image || !value.path || !value.size) {
      return;
    }

    this.isBeingUploaded = true;
    const formData = new FormData();
    formData.append('image', value.image);
    formData.append('size', value.size.toString());
    formData.append('path', value.path);

    this.drawingService
      .uploadAzureImage(formData)
      .pipe(
        finalize(() => {
          this.isBeingUploaded = false;
        })
      )
      .subscribe({
        next: resp => {
          if (resp && resp.ok) {
            this.imageUploaded.emit(resp);
          }
        },
        error: () => {
          this.alertService.showSilentAlert(
            this.customTranslate,
            'ERRORS.DRAWING.FORM.UPLOAD-IMAGE'
          );
        },
      });
  }
}
