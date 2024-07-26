import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NavbarLinkComponent } from './navbar-link/navbar-link.component';
import { NavBarConfig } from 'config/navbar/navbar.config';

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
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  currentRoute = '';
  listLinks = NavBarConfig.links;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Subscribe to route changes
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
}
