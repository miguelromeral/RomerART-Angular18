import { Component } from '@angular/core';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss',
})
export class NotfoundComponent {}
