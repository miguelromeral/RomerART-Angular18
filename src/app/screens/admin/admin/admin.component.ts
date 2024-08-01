import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/api/auth/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  constructor(private authService: AuthService) {}

  // ngOnInit() {
  //   this.authService.getInfo().subscribe(info => {
  //     console.log('info', info);
  //   });
  // }

  logout() {
    this.authService.logout();
  }
}
