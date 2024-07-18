import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-spotify-track',
  standalone: true,
  imports: [NgIf],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackComponent {
  spotifyUrl: SafeResourceUrl | undefined;

  @Input() set trackId(id: string) {
    this.spotifyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://open.spotify.com/embed/track/${id}?utm_source=generator`
    );
  }

  constructor(private sanitizer: DomSanitizer) {}
}
