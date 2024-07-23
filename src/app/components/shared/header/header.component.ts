import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  production = environment.production;
  version = environment.appVersion;
}
