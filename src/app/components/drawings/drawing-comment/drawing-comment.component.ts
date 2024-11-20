import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslatableComponent } from '@app/components/common/translatable/translatable.component';

export type CommentType = '' | 'style' | 'like' | 'dislike';

@Component({
  selector: 'app-art-details-drawing-comment',
  standalone: true,
  imports: [NgClass, NgIf, TranslatableComponent],
  templateUrl: './drawing-comment.component.html',
  styleUrl: './drawing-comment.component.scss',
})
export class DrawingCommentComponent {
  @Input() type: CommentType = '';
  @Input() comment: string | null = null;
  @Input() first = false;
}
