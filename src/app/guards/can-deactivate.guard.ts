import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | boolean {
    // console.log('Estoy en el guard');
    return component.canDeactivate();
  }
}
