import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VideoPlayerComponent } from '@app/components/shared/video-player/video-player.component';
import { GifPlayerComponent } from '@app/components/shared/gif-player/gif-player.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-drawing-timelapse',
  standalone: true,
  imports: [
    CommonModule,
    VideoPlayerComponent,
    GifPlayerComponent,
    TranslateModule,
    CustomTranslatePipe,
  ],
  templateUrl: './drawing-timelapse.component.html',
  styleUrl: './drawing-timelapse.component.scss',
})
export class DrawingTimelapseComponent {
  private _timelapseUrl!: string;
  @Input()
  public get timelapseUrl(): string {
    return this._timelapseUrl;
  }
  public set timelapseUrl(value: string) {
    this._timelapseUrl = value;
    this.detectMediaType(value);
  }

  isVideo = false;
  isGif = false;

  private detectMediaType(url: string): void {
    if (url === undefined || url === null || url === '') {
      return;
    }

    const lowerCaseUrl = url.toLowerCase();

    if (
      lowerCaseUrl.includes('.mp4') ||
      lowerCaseUrl.includes('.webm') ||
      lowerCaseUrl.includes('.ogg')
    ) {
      this.isVideo = true;
      this.isGif = false;
    } else if (lowerCaseUrl.includes('.gif')) {
      this.isVideo = false;
      this.isGif = true;
    } else {
      // Try to determine by fetching headers (fallback)
      this.detectMediaTypeByHeaders(lowerCaseUrl);
    }
  }

  private async detectMediaTypeByHeaders(url: string): Promise<void> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('video/')) {
        this.isVideo = true;
        this.isGif = false;
      } else if (contentType.includes('image/gif')) {
        this.isVideo = false;
        this.isGif = true;
      } else {
        // Default fallback - assume it's a video if extension detection failed
        this.isVideo = true;
        this.isGif = false;
      }
    } catch (error) {
      console.warn('Could not detect media type, defaulting to video:', error);
      this.isVideo = true;
      this.isGif = false;
    }
  }
}
