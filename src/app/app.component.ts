import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import {
  CommonModule,
  isPlatformBrowser,
  JsonPipe,
  NgClass,
  NgIf,
} from '@angular/common';
import { HeaderComponent } from './components/shared/header/header.component';
import { environment } from 'environments/environment';
import { MetadataService } from './services/metadata/metadata.service';
import { LanguageService } from './services/language/language.service';
import { ThemeService } from './services/theme/theme.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { BehaviorSubject } from 'rxjs';

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
})
export class AppComponent implements OnInit {
  title = environment.appName;

  static isBrowser = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private metadataService: MetadataService,
    private languageService: LanguageService,
    private localStorageService: LocalStorageService,
    private themeService: ThemeService
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

    this.metadataService.updateMetadata(
      environment.appName,
      'Página web en Angular 18',
      ''
      // window?.location?.origin + '/assets/images/miguel.jpeg'
    );
  }
}
