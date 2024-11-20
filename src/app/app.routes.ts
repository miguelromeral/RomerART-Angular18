import { DrawingDetailsScreenComponent } from './screens/drawings/drawing-details-screen/drawing-details-screen.component';
import { ErrorNotfoundScreenComponent } from './screens/errors/error-notfound-screen/error-notfound-screen.component';
import { Routes } from '@angular/router';
import { DrawingSearchScreenComponent } from './screens/drawings/drawing-search-screen/drawing-search-screen.component';
import { AdminIndexScreenComponent } from './screens/admin/admin-index-screen/admin-index-screen.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginScreenComponent } from './screens/auth/login-screen/login-screen.component';
import { loginPath } from 'config/auth/auth.config';
import { DrawingEditScreenComponent } from './screens/drawings/drawing-edit-screen/drawing-edit-screen.component';
import { AboutMeScreenComponent } from './screens/about/about-me-screen/about-me-screen.component';
import { CollectionEditScreenComponent } from './screens/collections/collection-edit-screen/collection-edit-screen.component';
import { CollectionCreateScreenComponent } from './screens/collections/collection-create-screen/collection-create-screen.component';
import { AboutCvScreenComponent } from './screens/about/about-cv-screen/about-cv-screen.component';
import { AboutIndexScreenComponent } from './screens/about/about-index-screen/about-index-screen.component';
import { CollectionSearchScreenComponent } from './screens/collections/collection-search-screen/collection-search-screen.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { HomeScreenComponent } from './screens/home/home-screen/home-screen.component';
import { SettingsScreenComponent } from './screens/settings/settings-screen/settings-screen.component';
import { DrawingCreateScreenComponent } from './screens/drawings/drawing-create-screen/drawing-create-screen.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeScreenComponent,
    data: {
      animation: 'HomePage',
    },
  },
  // {
  //   path: 'debug',
  //   component: DebugComponent,
  //   data: {
  //     animation: 'DebugPage',
  //   },
  // },
  {
    path: 'settings',
    component: SettingsScreenComponent,

    data: {
      animation: 'SettingsPage',
    },
  },
  {
    path: 'collections',
    component: CollectionSearchScreenComponent,

    data: {
      animation: 'CollectionsPage',
    },
  },
  {
    path: 'art',
    component: DrawingSearchScreenComponent,

    data: {
      animation: 'ArtPage',
    },
  },
  {
    path: 'about',
    component: AboutIndexScreenComponent,
    data: {
      animation: 'AboutPage',
    },
  },
  {
    path: 'about/me',
    component: AboutMeScreenComponent,
    data: {
      animation: 'AboutMePage',
    },
  },
  {
    path: 'about/hire',
    component: AboutCvScreenComponent,
    data: {
      animation: 'CVPage',
    },
  },
  {
    path: 'art/details/:id',
    component: DrawingDetailsScreenComponent,
    data: { withComponentInputBinding: true, animation: 'ArtDetailsPage' },
  },
  {
    path: 'art/edit/:id',
    component: DrawingEditScreenComponent,
    data: { withComponentInputBinding: true, animation: 'ArtEditPage' },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'art/create',
    component: DrawingCreateScreenComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    data: {
      animation: 'ArtCreatePage',
    },
  },
  {
    path: loginPath,
    component: LoginScreenComponent,
    data: {
      animation: 'LoginPage',
    },
  },
  {
    path: 'admin',
    component: AdminIndexScreenComponent,
    canActivate: [AuthGuard],
    data: {
      animation: 'AdminPage',
    },
  },
  {
    path: 'collections/edit/:id',
    component: CollectionEditScreenComponent,
    data: { withComponentInputBinding: true, animation: 'CollectionEditPage' },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'collections/create',
    component: CollectionCreateScreenComponent,
    data: {
      animation: 'CollectionCreatePage',
    },
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: '**',
    component: ErrorNotfoundScreenComponent,
    data: {
      animation: 'NotFoundPage',
    },
  },
];
