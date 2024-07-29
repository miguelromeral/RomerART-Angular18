import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TabPanelItem } from '@models/components/tab-panel-item.model';
import { TranslateModule } from '@ngx-translate/core';
import {
  artTabInfoIds,
  IArtInfoTabsConfigId,
} from 'config/art/art-info-tabs.config';

@Component({
  selector: 'app-tab-panel',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './tab-panel.component.html',
  styleUrl: './tab-panel.component.scss',
})
export class TabPanelComponent extends LanguageComponent {
  @Input() tabs: TabPanelItem[] = [];
  panelsId: IArtInfoTabsConfigId = artTabInfoIds;
  @Input() selectedTab = '';

  constructor() {
    super('SCREENS.DRAWING-DETAILS');
  }

  // ngOnInit() {
  //   if (this.tabs.length > 0) {
  //     this.selectTab(0);
  //   }
  // }

  changeTab(id: string) {
    this.selectedTab = id;
  }
}
