import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ZoomImageComponent } from '../zoom-image/zoom-image.component';

@Component({
  selector: 'app-gif-player',
  standalone: true,
  imports: [CommonModule, ZoomImageComponent],
  templateUrl: './gif-player.component.html',
  styleUrl: './gif-player.component.scss',
})
export class GifPlayerComponent {
  @Input() gifUrl!: string;
}
