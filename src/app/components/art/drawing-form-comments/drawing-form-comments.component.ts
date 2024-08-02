import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInputComponent } from '@app/components/shared/inputs/text-input/text-input.component';

@Component({
  selector: 'app-drawing-form-comments',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TextInputComponent],
  templateUrl: './drawing-form-comments.component.html',
  styleUrl: './drawing-form-comments.component.scss',
})
export class DrawingFormCommentsComponent {
  @Input() formArrayName!: string;
  @Input() label!: string;
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

  removeComment(index: number) {
    this.formArray.removeAt(index);
  }
  addComment(comment: string) {
    this.formArray.push(new FormControl(comment, Validators.required));
  }
}
