import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageComponent } from '@models/components/LanguageComponent';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, TranslateModule, CustomTranslatePipe],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
  providers: [CustomTranslatePipe],
})
export class VideoPlayerComponent extends LanguageComponent implements OnInit {
  @ViewChild('videoPlayer', { static: false })
  videoPlayer!: ElementRef<HTMLVideoElement>;

  @Input() videoUrl!: string;
  @Input() posterUrl = '';
  @Input() showInfo = false;
  @Input() infoText = '';
  @Input() controls = true;
  @Input() autoplay = true;
  @Input() muted = false;
  @Input() loop = true;
  @Input() preload: 'none' | 'metadata' | 'auto' = 'metadata';

  @Input() showLoadingOverlay = true;
  @Input() showErrorOverlay = true;

  // Video player state
  isLoading = false;
  hasError = false;
  isReady = false;

  constructor(private customTranslate: CustomTranslatePipe) {
    super('COMPONENTS.VIDEO');
  }

  ngOnInit(): void {
    if (!this.videoUrl) {
      console.warn('VideoPlayerComponent: videoUrl input is required');
    }
  }

  onVideoLoadStart(): void {
    this.isLoading = true;
    this.hasError = false;
    this.isReady = false;
  }

  onVideoMetadataLoaded(): void {
    this.isLoading = false;
    this.isReady = true;
  }

  onVideoCanPlay(): void {
    this.isLoading = false;
    this.isReady = true;
  }

  onVideoError(event: Event): void {
    this.isLoading = false;
    this.hasError = true;
    this.isReady = false;
    console.error('Video loading error:', event);
  }

  retryVideo(): void {
    this.hasError = false;
    this.isLoading = true;

    if (this.videoPlayer?.nativeElement) {
      // Force reload the video
      this.videoPlayer.nativeElement.load();
    }
  }

  // Public methods for external control
  play(): void {
    if (this.videoPlayer?.nativeElement && this.isReady) {
      this.videoPlayer.nativeElement.play();
    }
  }

  pause(): void {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.pause();
    }
  }

  getCurrentTime(): number {
    return this.videoPlayer?.nativeElement?.currentTime || 0;
  }

  getDuration(): number {
    return this.videoPlayer?.nativeElement?.duration || 0;
  }

  setCurrentTime(time: number): void {
    if (this.videoPlayer?.nativeElement && this.isReady) {
      this.videoPlayer.nativeElement.currentTime = time;
    }
  }

  getVolume(): number {
    return this.videoPlayer?.nativeElement?.volume || 1;
  }

  setVolume(volume: number): void {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.volume = Math.max(0, Math.min(1, volume));
    }
  }

  mute(): void {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.muted = true;
    }
  }

  unmute(): void {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.muted = false;
    }
  }

  toggleMute(): void {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.muted =
        !this.videoPlayer.nativeElement.muted;
    }
  }

  isPlaying(): boolean {
    const video = this.videoPlayer?.nativeElement;
    return video
      ? !video.paused && !video.ended && video.readyState > 2
      : false;
  }

  isPaused(): boolean {
    return this.videoPlayer?.nativeElement?.paused || false;
  }

  isEnded(): boolean {
    return this.videoPlayer?.nativeElement?.ended || false;
  }
}
