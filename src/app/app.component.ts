import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  ChildrenOutletContexts,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from './components/common/layout/navbar/navbar/navbar.component';
import {
  CommonModule,
  isPlatformBrowser,
  JsonPipe,
  NgClass,
  NgIf,
} from '@angular/common';
import { HeaderComponent } from './components/common/layout/header/header.component';
import { environment } from 'environments/environment';
import { MetadataService } from './services/metadata/metadata.service';
import { LanguageService } from './services/language/language.service';
import { ThemeService } from './services/theme/theme.service';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/api/auth/auth.service';
import { slideInAnimation } from './animations/animations';
import { SettingsService } from './services/settings/settings.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    JsonPipe,
    CommonModule,
    NavbarComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  title = environment.appName;

  static isBrowser = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private metadataService: MetadataService,
    private languageService: LanguageService,
    private authService: AuthService,
    private themeService: ThemeService,
    private contexts: ChildrenOutletContexts,
    private settingsService: SettingsService
  ) {
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
  }

  ngOnInit() {
    if (AppComponent.isBrowser) {
      this.init();
    }
  }

  init() {
    this.themeService.init();
    this.languageService.init();
    this.authService.init();

    this.metadataService.updateMetadata(
      environment.appName,
      'Página web en Angular 18',
      ''
      // window?.location?.origin + '/assets/images/miguel.jpeg'
    );

    this.settingsService.init();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
