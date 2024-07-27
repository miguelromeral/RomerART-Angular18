import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { CommonModule, JsonPipe, NgClass, NgIf } from '@angular/common';
import { HeaderComponent } from './components/shared/header/header.component';
import { environment } from 'environments/environment';
import { MetadataService } from './services/metadata/metadata.service';

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

  constructor(private metadataService: MetadataService) {}

  ngOnInit() {
    this.metadataService.updateMetadata(
      environment.appName,
      'Página web en Angular 18',
      window.location.origin + '/assets/images/miguel.jpeg',
      window.location.href
    );
  }
}
