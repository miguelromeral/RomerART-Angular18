import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  ArtSectionConfig,
  ArtSectionType,
  IArtSectionType,
} from 'config/art/art-section.config';

@Component({
  selector: 'app-details-section',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent implements OnInit {
  tagDelimiter = ';';

  @Input() type: ArtSectionType = '';
  @Input() rawText = '';
  @Input() listItems: string[] = [];
  @Input() listTags: string[] = [];
  @Input() large = false;
  @Input() tags = false;
  @Input() capitalize = false;

  selectedType: IArtSectionType = { id: '', icon: '', text: '' };

  ngOnInit() {
    this.loadSelectedType();
  }

  loadSelectedType() {
    const results = ArtSectionConfig.types.filter(type => type.id == this.type);
    if (results.length === 1) {
      this.selectedType = results[0];
    }
  }
}
