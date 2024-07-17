import { DetailsComponent } from './screens/art/details/details.component';
import { DebugComponent } from './screens/debug/debug.component';
import { HomeComponent } from './screens/home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'debug', component: DebugComponent },
  { path: 'art/details', component: DetailsComponent },
];
