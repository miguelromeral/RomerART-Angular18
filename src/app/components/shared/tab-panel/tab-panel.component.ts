import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TabPanelItem } from '@models/components/tab-panel-item.model';
import {
  artTabInfoIds,
  IArtInfoTabsConfigId,
} from 'config/art/art-info-tabs.config';

@Component({
  selector: 'app-tab-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-panel.component.html',
  styleUrl: './tab-panel.component.scss',
})
export class TabPanelComponent {
  @Input() tabs: TabPanelItem[] = [];
  panelsId: IArtInfoTabsConfigId = artTabInfoIds;
  @Input() selectedTab = '';

  // ngOnInit() {
  //   if (this.tabs.length > 0) {
  //     this.selectTab(0);
  //   }
  // }

  changeTab(id: string) {
    this.selectedTab = id;
  }
}
