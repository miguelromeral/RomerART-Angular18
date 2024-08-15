import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslatableComponent } from '@app/components/shared/translatable/translatable.component';

export type CommentType = '' | 'like' | 'dislike';

@Component({
  selector: 'app-art-details-comment',
  standalone: true,
  imports: [NgClass, NgIf, TranslatableComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() type: CommentType = '';
  @Input() comment: string | null = null;
  @Input() first = false;
}
