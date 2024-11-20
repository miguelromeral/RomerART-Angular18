import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RichTextInputComponent } from '@app/components/common/inputs/rich-text-input/rich-text-input.component';
import { TextInputComponent } from '@app/components/common/inputs/text-input/text-input.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-drawing-comments-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TextInputComponent,
    TranslateModule,
    RichTextInputComponent,
    CustomTranslatePipe,
  ],
  templateUrl: './drawing-comments-form.component.html',
  styleUrl: './drawing-comments-form.component.scss',
})
export class DrawingCommentsFormComponent extends LanguageComponent {
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
