import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NavbarLinkComponent } from '../navbar-link/navbar-link.component';
import { INavBarLink, NavBarConfig } from 'config/navbar/navbar.config';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    NgStyle,
    NgFor,
    NavbarLinkComponent,
    TranslateModule,
    CustomTranslatePipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent extends LanguageComponent implements OnInit {
  currentRoute = '';
  listLinks: INavBarLink[] = NavBarConfig.links;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    super('SCREENS.NAVBAR');
  }

  ngOnInit() {
    // Subscribe to route changes
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
}
