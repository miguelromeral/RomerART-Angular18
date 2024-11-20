import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-spotify-spotify-track',
  standalone: true,
  imports: [NgIf],
  templateUrl: './spotify-track.component.html',
  styleUrl: './spotify-track.component.scss',
})
export class SpotifyTrackComponent {
  spotifyUrl: SafeResourceUrl | undefined;

  @Input() set trackId(id: string) {
    this.spotifyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://open.spotify.com/embed/track/${id}?utm_source=generator`
    );
  }

  constructor(private sanitizer: DomSanitizer) {}
}
