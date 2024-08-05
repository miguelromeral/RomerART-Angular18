import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-instagram-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instagram-post.component.html',
  styleUrl: './instagram-post.component.scss',
})
export class InstagramPostComponent {
  _postId = '';
  @Input()
  public get postId() {
    return this._postId;
  }
  public set postId(value: string) {
    this._postId = value;
    this.setLinks();
  }

  // instagramLink = '';
  instagramLink: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  setLinks() {
    this.instagramLink = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.instagram.com/p/${this.postId}/embed/`
    );
  }
}
