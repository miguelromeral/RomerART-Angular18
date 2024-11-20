import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-link',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NgStyle, NgIf],
  templateUrl: './navbar-link.component.html',
  styleUrl: './navbar-link.component.scss',
})
export class NavbarLinkComponent {
  @Input() routerLink!: string;
  @Input() text!: string;
  @Input() icon!: string;
  @Input() iconActive!: string;
  @Input() currentUrl!: string;
  @Input() optionClass = '';
  @Input() image = '';

  get active(): boolean {
    return this.routerLink === this.currentUrl;
  }
}
