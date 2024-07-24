import { DetailsComponent } from './screens/art/details/details.component';
import { DebugComponent } from './screens/debug/debug.component';
import { HomeComponent } from './screens/home/home.component';
import { NotfoundComponent } from './screens/errors/notfound/notfound.component';
import { Routes } from '@angular/router';
import { SettingsComponent } from './screens/settings/settings.component';
import { SearchComponent } from './screens/art/search/search.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'debug', component: DebugComponent },
  { path: 'settings', component: SettingsComponent },
  {
    path: 'art',
    component: SearchComponent,
    children: [
      {
        path: 'details/:id',
        component: DetailsComponent,
        data: { withComponentInputBinding: true },
      },
    ],
  },
  { path: '**', component: NotfoundComponent },
];
