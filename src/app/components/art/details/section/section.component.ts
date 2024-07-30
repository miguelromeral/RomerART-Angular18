import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import {
  ArtSectionConfig,
  ArtSectionType,
  IArtSectionType,
} from 'config/art/art-section.config';

@Component({
  selector: 'app-details-section',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, TranslateModule, CustomTranslatePipe],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class SectionComponent extends LanguageComponent implements OnInit {
  tagDelimiter = ';';

  @Input() type: ArtSectionType = '';
  @Input() rawText = '';
  @Input() listItems: string[] = [];
  @Input() listTags: string[] = [];
  @Input() large = false;
  @Input() tags = false;
  @Input() capitalize = false;

  selectedType: IArtSectionType = { id: '', icon: '', text: '' };

  constructor() {
    super('SCREENS.DRAWING-DETAILS.DETAILS.SECTIONS');
  }

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
