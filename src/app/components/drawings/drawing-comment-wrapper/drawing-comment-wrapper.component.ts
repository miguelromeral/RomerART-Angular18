import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  CommentType,
  DrawingCommentComponent,
} from '../drawing-comment/drawing-comment.component';

@Component({
  selector: 'app-art-details-drawing-comment-wrapper',
  standalone: true,
  imports: [NgFor, DrawingCommentComponent, NgClass],
  templateUrl: './drawing-comment-wrapper.component.html',
  styleUrl: './drawing-comment-wrapper.component.scss',
})
export class DrawingCommentWrapperComponent {
  @Input() comments: string[] = [];
  @Input() type: CommentType = '';
}
