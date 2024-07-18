import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommentComponent, CommentType } from '../comment/comment.component';

@Component({
  selector: 'app-art-details-comment-wrapper',
  standalone: true,
  imports: [NgFor, CommentComponent, NgClass],
  templateUrl: './comment-wrapper.component.html',
  styleUrl: './comment-wrapper.component.scss',
})
export class CommentWrapperComponent {
  @Input() comments: string[] = [];
  @Input() type: CommentType = '';
}
