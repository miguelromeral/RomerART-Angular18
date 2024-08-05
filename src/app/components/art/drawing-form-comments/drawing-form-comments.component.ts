import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInputComponent } from '@app/components/shared/inputs/text-input/text-input.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-drawing-form-comments',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TextInputComponent,
    TranslateModule,
    CustomTranslatePipe,
  ],
  templateUrl: './drawing-form-comments.component.html',
  styleUrl: './drawing-form-comments.component.scss',
})
export class DrawingFormCommentsComponent extends LanguageComponent {
  @Input() formArrayName!: string;
  @Input() placeholder = '';
  @Input() formArray!: FormArray<FormControl>;

  private _comments: string[] = [];
  @Input()
  public get comments() {
    return this._comments;
  }
  public set comments(value: string[]) {
    this._comments = value;
    this._comments.forEach(comment => {
      this.addComment(comment);
    });
  }

  constructor() {
    super('SCREENS.DRAWING-FORM.FORM.COMMENTS');
  }

  removeComment(index: number) {
    this.formArray.removeAt(index);
  }
  addComment(comment: string) {
    this.formArray.push(new FormControl(comment, Validators.required));
  }
}
