import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CommonModule, JsonPipe, NgClass, NgIf } from '@angular/common';
import { HeaderComponent } from './components/shared/header/header.component';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { LanguageService } from './services/language/language.service';
import { LocalStorageConfig } from 'config/settings/local-storage.config';
import { environment } from 'environments/environment';

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
export class AppComponent {
  title = `romerart-angular18`;
}
