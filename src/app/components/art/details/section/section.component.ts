import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-section',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent implements OnInit {
  tagDelimiter = ';';

  @Input() title!: string;
  @Input() rawText = '';
  @Input() listItems: string[] = [];
  @Input() large = false;
  @Input() tags = false;
  @Input() capitalize = false;
  listTags: string[] = [];

  // @Input() set trackId(id: string) {
  //   this.spotifyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  //     `https://open.spotify.com/embed/track/${id}?utm_source=generator`
  //   );
  // }

  ngOnInit() {
    if (this.tags && this.rawText.length > 0) {
      this.listTags = this.rawText.split(this.tagDelimiter);
    }
  }

  // @foreach(var tag in Model.RawText.Split(";"))
}
