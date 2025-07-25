import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SelectInputComponent } from '@app/components/shared/inputs/select-input/select-input.component';
import { SwitchComponent } from '@app/components/shared/inputs/switch/switch.component';
import { TextInputComponent } from '@app/components/shared/inputs/text-input/text-input.component';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { LoadingComponent } from '@app/components/shared/loading/loading.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
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
import { DrawingThumbnailComponent } from '../drawing-thumbnail/drawing-thumbnail.component';
import { AzureImageFormComponent } from '../azure-image-form/azure-image-form.component';
import { UploadAzureImageResponse } from '@models/responses/upload-azure-image.response';
import { scoreConfig } from 'config/art/art-details-form.config';
import { getHumanTimeFromMinutes } from '@utils/customization/text-utils';
import { getFormErrors } from '@utils/form-control.utils';
import { ISaveDrawingRequest } from '@models/requests/save-drawing-request.model';
import { AlertService } from '@app/services/alerts/alert.service';
import { notValidValueValidator } from '@app/validators/not-valid-value.validator';
import { SectionComponent } from '@app/components/shared/section/section.component';
import { DrawingFilterEffect } from '@models/art/drawing-filter-effect.model';
import { AzureUploadFormComponent } from '@app/components/azure-upload-form/azure-upload-form.component';
import { UploadAzureBlobResponse } from '@models/responses/upload-azure-blob.response';
import { LabelComponent } from '@app/components/shared/inputs/label/label.component';

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
    SectionComponent,
    DrawingFormCommentsComponent,
    DateInputComponent,
    DrawingThumbnailComponent,
    AzureImageFormComponent,
    AzureUploadFormComponent,
    LabelComponent,
  ],
  providers: [CustomTranslatePipe],
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
    // console.log('Drawing:', value);
    this.setFormValues(value);
  }

  protected timelapsePath = 'timelapses';

  @Input() drawingNotFound: boolean | undefined;
  @Input() loading = true;
  @Input() newDrawing!: boolean;

  public get validForm() {
    return this.form.valid && !this.duplicateId;
  }

  /* Config */
  scoreConfig = scoreConfig;

  /* Form */
  form = new FormGroup({
    isEditing: new FormControl(this.newDrawing, Validators.required),
    id: new FormControl('', Validators.required),
    path: new FormControl('', Validators.required),
    pathThumbnail: new FormControl('', Validators.required),
    pathTimelapse: new FormControl(''),
    title: new FormControl(''),
    favorite: new FormControl(false, Validators.required),
    name: new FormControl(''),
    modelName: new FormControl(''),
    type: new FormControl(0, [Validators.required, notValidValueValidator(0)]),
    software: new FormControl(0),
    paper: new FormControl(0),
    filter: new FormControl(0),
    dateHyphen: new FormControl('', Validators.required),
    scoreCritic: new FormControl(0, [
      Validators.required,
      Validators.min(this.scoreConfig.min),
      Validators.max(this.scoreConfig.max),
    ]),
    time: new FormControl(0),
    productType: new FormControl(0, [
      Validators.required,
      notValidValueValidator(0),
    ]),
    productName: new FormControl(''),
    listComments: new FormArray<FormControl>([]),
    listCommentsStyle: new FormArray<FormControl>([]),
    listCommentsPros: new FormArray<FormControl>([]),
    listCommentsCons: new FormArray<FormControl>([]),
    tagsText: new FormControl(''),
    referenceUrl: new FormControl(''),
    spotifyUrl: new FormControl(''),
    instagramUrl: new FormControl(''),
    blueskyUrl: new FormControl(''),
    visible: new FormControl(true, Validators.required),
  });

  get listComments(): FormArray<FormControl> {
    return this.form.controls.listComments as FormArray<FormControl>;
  }
  get listCommentsStyle(): FormArray<FormControl> {
    return this.form.controls.listCommentsStyle as FormArray<FormControl>;
  }
  get listCommentsPros(): FormArray<FormControl> {
    return this.form.controls.listCommentsPros as FormArray<FormControl>;
  }
  get listCommentsCons(): FormArray<FormControl> {
    return this.form.controls.listCommentsCons as FormArray<FormControl>;
  }

  /* List of Select Options */
  listDrawingStyles: DrawingStyle[] = [];
  listDrawingSoftwares: DrawingSoftware[] = [];
  listDrawingFilters: DrawingFilterEffect[] = [];
  listDrawingPapers: DrawingPaperSize[] = [];
  listDrawingProductTypes: DrawingProductType[] = [];

  @ViewChild('image') image!: ElementRef<HTMLImageElement>;
  @ViewChild('imageThumbnail') imageThumbnail!: ElementRef<HTMLImageElement>;

  /* Form Behaviour */
  duplicateId = false;
  showAzureForm = true;
  showTimelapseForm = false;
  validationAzureImage = false;
  timeHuman = '';

  public get formErrors() {
    return getFormErrors(
      this.form,
      'SCREENS.DRAWING-FORM.ERRORS.GENERAL',
      this.customTranslate
    );
  }

  constructor(
    private drawingService: DrawingService,
    private alertService: AlertService,
    private metadataService: MetadataService,
    private customTranslate: CustomTranslatePipe,
    private renderer: Renderer2,
    private router: Router
  ) {
    super('SCREENS.DRAWING-FORM');
    this.listDrawingStyles = this.drawingService.getDrawingStyles();
    this.listDrawingSoftwares = this.drawingService.getDrawingSoftwares();
    this.listDrawingFilters = this.drawingService.getDrawingFilterEffects();
    this.listDrawingPapers = this.drawingService.getDrawingPaperSizes();
    this.listDrawingProductTypes = this.drawingService.getDrawingProductTypes();
  }

  setFormValues(drawing: Drawing) {
    this.form.controls.isEditing.setValue(drawing.id !== '');
    this.form.controls.id.setValue(drawing.id);
    this.metadataService.updateTitle(
      this.customTranslate.transform(
        this.text(this.drawing.id !== '' ? 'TITLE.EDIT' : 'TITLE.CREATE'),
        {
          id: drawing.id,
        }
      )
    );
    if (drawing.path !== '') {
      this.showAzureForm = false;
      this.form.controls.path.setValue(drawing.path);
      this.form.controls.pathThumbnail.setValue(drawing.pathThumbnail);
      this.validationAzureImage = true;
    }
    this.form.controls.title.setValue(drawing.title);
    if (drawing.pathTimelapse !== '') {
      this.showTimelapseForm = false;
      this.checkAzurePathTimelapseFromData(drawing.pathTimelapse);
    }
    this.form.controls.favorite.setValue(drawing.favorite);
    this.form.controls.name.setValue(drawing.name);
    this.form.controls.modelName.setValue(drawing.modelName);
    this.form.controls.type.setValue(drawing.type);
    this.form.controls.filter.setValue(drawing.filter);
    this.form.controls.software.setValue(drawing.software);
    this.form.controls.paper.setValue(drawing.paper);
    this.form.controls.dateHyphen.setValue(drawing.dateHyphen);
    this.form.controls.scoreCritic.setValue(drawing.scoreCritic);
    this.form.controls.time.setValue(drawing.time);
    this.timeHuman = getHumanTimeFromMinutes(drawing.time);
    this.form.controls.productType.setValue(drawing.productType);
    this.form.controls.productName.setValue(drawing.productName);
    this.form.controls.tagsText.setValue(drawing.tags.join(' '));
    this.form.controls.referenceUrl.setValue(drawing.referenceUrl);
    this.form.controls.spotifyUrl.setValue(drawing.spotifyUrl);
    this.form.controls.visible.setValue(drawing.visible);
    this.form.controls.blueskyUrl.setValue(drawing.blueskyUrl);
    this.form.controls.instagramUrl.setValue(drawing.instagramUrl);
  }

  updateTime(event: Event) {
    try {
      const input = event.target as HTMLInputElement;
      const value = input.value;

      this.timeHuman = getHumanTimeFromMinutes(parseInt(value));
    } catch (e) {
      console.error('Could not calculate time: ' + e);
      this.timeHuman = '??';
    }
  }

  checkDrawingId(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.drawingService.checkDrawingId(value).subscribe({
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
        }
      },
      error: () => {
        this.alertService.showSilentAlert(
          this.customTranslate,
          'ERRORS.DRAWING.FORM.CHECKID',
          { id: value }
        );
      },
    });
  }

  checkAzurePath(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.drawingService.checkAzurePath(value).subscribe({
      next: resp => {
        this.setStylePathInputDirect(input, resp.existe);
        if (resp.existe) {
          this.drawing.url = resp.url;
          this.drawing.urlThumbnail = resp.urlThumbnail;
          this.form.controls.pathThumbnail.setValue(resp.pathThumbnail);
        } else {
          this._drawing.url = '';
          this._drawing.urlThumbnail = '';

          this.alertService.showAlert(
            this.customTranslate.transform(
              this.text('ALERTS.IMAGE-NOT-FOUND.TITLE')
            ),
            this.customTranslate.transform(
              this.text('ALERTS.IMAGE-NOT-FOUND.MESSAGE'),
              { path: value }
            )
          );
        }
        this.showAzureForm = !resp.existe;
      },
      error: () => {
        this.alertService.showAlert(
          this.customTranslate.transform(
            this.text('ALERTS.ERROR-CHECK-AZURE-PATH.TITLE')
          ),
          this.customTranslate.transform(
            this.text('ALERTS.ERROR-CHECK-AZURE-PATH.MESSAGE')
          )
        );
      },
    });
  }

  private setStylePathInputDirect(
    htmlInput: HTMLInputElement,
    exists: boolean
  ) {
    if (exists) {
      htmlInput.classList.remove('not-exists');
      htmlInput.classList.add('exists');
    } else {
      htmlInput.classList.remove('exists');
      htmlInput.classList.add('not-exists');
    }
  }

  receiveUploadedImage(event: UploadAzureImageResponse) {
    this.drawing.url = event.url;
    this.drawing.urlThumbnail = event.urlThumbnail;
    this.drawing.pathThumbnail = event.pathThumbnail;

    this.form.controls.pathThumbnail.setValue(event.pathThumbnail);
    this.showAzureForm = false;

    this.renderer.setAttribute(this.image.nativeElement, 'src', '');
    this.renderer.setAttribute(this.imageThumbnail.nativeElement, 'src', '');
    setTimeout(() => {
      this.renderer.setAttribute(this.image.nativeElement, 'src', event.url);
      this.renderer.setAttribute(
        this.imageThumbnail.nativeElement,
        'src',
        event.urlThumbnail
      );
    });
  }

  checkAzurePathTimelapse(event: string) {
    const path = `${this.timelapsePath}/${event}`;
    this.checkAzurePathTimelapseFromData(path);
  }

  checkAzurePathTimelapseFromData(fullPathTimelapse: string) {
    this.drawingService.checkAzurePath(fullPathTimelapse).subscribe({
      next: resp => {
        if (resp.existe) {
          this._drawing.pathTimelapse = fullPathTimelapse;
          this.form.controls.pathTimelapse.setValue(fullPathTimelapse);
        } else {
          this._drawing.urlTimelapse = '';
          this._drawing.pathTimelapse = '';
          this.form.controls.pathTimelapse.setValue('');
        }
        this.showTimelapseForm = resp.existe;
      },
    });
  }

  receiveUploadedThumbnail(event: UploadAzureBlobResponse) {
    this.showTimelapseForm = event.ok;
    this.drawing.urlTimelapse = event.url;
    this.drawing.pathTimelapse = event.path;
    this.form.controls.pathTimelapse.setValue(event.ok ? event.path : '');
  }

  saveDrawing() {
    // console.log(this.form.value);
    const values = this.form.value;

    const formData: ISaveDrawingRequest = {
      id: values.id!,
      dateHyphen: values.dateHyphen!,
      favorite: values.favorite!,
      isEditing: values.isEditing!,
      listCommentsCons: values.listCommentsCons!,
      listCommentsPros: values.listCommentsPros!,
      listCommentsStyle: values.listCommentsStyle!,
      listComments: values.listComments!,
      modelName: values.modelName!,
      name: values.name!,
      paper: values.paper!,
      path: values.path!,
      pathThumbnail: values.pathThumbnail!,
      pathTimelapse: values.pathTimelapse!,
      productName: values.productName!,
      productType: values.productType!,
      referenceUrl: values.referenceUrl!,
      scoreCritic: values.scoreCritic!,
      software: values.software!,
      spotifyUrl: values.spotifyUrl!,
      tagsText: values.tagsText!,
      time: values.time!,
      title: values.title!,
      type: values.type!,
      filter: values.filter!,
      visible: values.visible!,
      blueskyUrl: values.blueskyUrl!,
      instagramUrl: values.instagramUrl!,
    };
    this.drawingService.saveDrawing(formData).subscribe({
      next: resp => {
        this._drawing.id = resp.id;
        this.newDrawing = false;
        this.form.controls.isEditing.setValue(true);
        this.form.controls.tagsText.setValue(resp.tagsText);

        this.alertService.showAlert(
          this.customTranslate.transform(this.text('ALERTS.SAVED.TITLE')),
          this.customTranslate.transform(this.text('ALERTS.SAVED.MESSAGE'), {
            id: values.id,
          })
        );
        this.router.navigate([`art/details/${resp.id}`]);
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
