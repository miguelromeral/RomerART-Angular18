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

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'debug', component: DebugComponent },
  { path: 'settings', component: SettingsComponent },
  {
    path: 'art',
    component: SearchComponent,
  },
  {
    path: 'art/details/:id',
    component: DetailsComponent,
    data: { withComponentInputBinding: true },
  },
  {
    path: 'art/edit/:id',
    component: EditComponent,
    data: { withComponentInputBinding: true },
    canActivate: [AuthGuard],
  },
  {
    path: 'art/create',
    component: CreateComponent,
    canActivate: [AuthGuard],
  },
  { path: loginPath, component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotfoundComponent },
];
