import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AlertService } from '@app/services/alerts/alert.service';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { TextInputComponent } from '../shared/inputs/text-input/text-input.component';
import { UploadAzureBlobResponse } from '@models/responses/upload-azure-blob.response';

@Component({
  selector: 'app-azure-upload-form',
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
  templateUrl: './azure-upload-form.component.html',
  styleUrl: './azure-upload-form.component.scss',
})
export class AzureUploadFormComponent extends LanguageComponent {
  private _path = '';

  @Input() label!: string;
  @Input() placeholder = '';
  @Input() accept!: string;
  @Output() fileChanged = new EventEmitter<any>();
  @Output() fileNameChanged = new EventEmitter<string>();

  @Input()
  public get path() {
    return this._path;
  }
  public set path(value: string) {
    this._path = value;
    this.init();
  }
  @Output() uploaded = new EventEmitter<UploadAzureBlobResponse>();
  isBeingUploaded = false;

  constructor(
    private drawingService: DrawingService,
    private alertService: AlertService,
    private customTranslate: CustomTranslatePipe
  ) {
    super('COMPONENTS.AZURE.UPLOAD');
  }

  azureForm = new FormGroup({
    path: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    file: new FormControl('', Validators.required),
  });

  init() {
    this.azureForm.controls.path.setValue(this.path);
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.azureForm.patchValue({
        file: file,
      });
      this.fileNameChanged.emit(file.name);
    }
    this.fileChanged.emit(event);
  }

  upload() {
    if (!this.azureForm.valid) {
      return;
    }

    this.isBeingUploaded = true;

    const value = this.azureForm.value;
    if (!value.file || !value.path) {
      return;
    }

    this.isBeingUploaded = true;
    const formData = new FormData();
    formData.append('file', value.file);
    formData.append('path', this.path);

    this.drawingService
      .uploadAzureBlob(formData)
      .pipe(
        finalize(() => {
          this.isBeingUploaded = false;
        })
      )
      .subscribe({
        next: resp => {
          if (resp && resp.ok) {
            this.uploaded.emit(resp);
          }
        },
        error: () => {
          this.alertService.showSilentAlert(
            this.customTranslate,
            'COMPONENTS.AZURE.UPLOAD.ERROR-UPLOADING'
          );
        },
      });
  }
}
