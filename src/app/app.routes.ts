import { DetailsComponent } from './screens/art/details/details.component';
import { DebugComponent } from './screens/debug/debug.component';
import { HomeComponent } from './screens/home/home.component';
import { NotfoundComponent } from './screens/errors/notfound/notfound.component';
import { Routes } from '@angular/router';
import { SettingsComponent } from './screens/settings/settings.component';
import { SearchComponent } from './screens/art/search/search.component';
import { AdminComponent } from './screens/admin/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './screens/auth/login/login.component';
import { loginPath } from 'config/auth/auth.config';
import { EditComponent } from './screens/art/edit/edit.component';
import { CreateComponent } from './screens/art/create/create.component';
import { MeComponent } from './screens/about/me/me.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      animation: 'HomePage',
    },
  },
  {
    path: 'debug',
    component: DebugComponent,
    data: {
      animation: 'DebugPage',
    },
  },
  {
    path: 'settings',
    component: SettingsComponent,

    data: {
      animation: 'SettingsPage',
    },
  },
  {
    path: 'art',
    component: SearchComponent,

    data: {
      animation: 'ArtPage',
    },
  },
  {
    path: 'about',
    component: MeComponent,
    data: {
      animation: 'AboutPage',
    },
  },
  {
    path: 'art/details/:id',
    component: DetailsComponent,
    data: { withComponentInputBinding: true, animation: 'ArtDetailsPage' },
  },
  {
    path: 'art/edit/:id',
    component: EditComponent,
    data: { withComponentInputBinding: true, animation: 'ArtEditPage' },
    canActivate: [AuthGuard],
  },
  {
    path: 'art/create',
    component: CreateComponent,
    canActivate: [AuthGuard],

    data: {
      animation: 'ArtCreatePage',
    },
  },
  {
    path: loginPath,
    component: LoginComponent,
    data: {
      animation: 'LoginPage',
    },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      animation: 'AdminPage',
    },
  },
  {
    path: '**',
    component: NotfoundComponent,
    data: {
      animation: 'NotFoundPage',
    },
  },
];
