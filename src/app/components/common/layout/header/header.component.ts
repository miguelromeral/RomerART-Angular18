import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AuthService } from '@app/services/api/auth/auth.service';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, NgIf, TranslateModule, CustomTranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent
  extends LanguageComponent
  implements OnInit, OnDestroy
{
  production = environment.production;
  version = environment.appVersion;

  userSubscription: Subscription | undefined;

  name = '';

  constructor(private authService: AuthService) {
    super('SCREENS.HEADER');
  }

  ngOnInit() {
    this.userSubscription = this.authService.loggedUser$.subscribe(user => {
      this.name = user?.username ?? '';
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
