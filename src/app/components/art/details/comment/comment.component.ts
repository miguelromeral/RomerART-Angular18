import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

export type CommentType = '' | 'like' | 'dislike';

@Component({
  selector: 'app-art-details-comment',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() type: CommentType = '';
  @Input() comment: string | null = null;
  @Input() first = false;
}
