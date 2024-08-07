// animations.ts
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const filterFormAnimation = trigger('filterFormAnimation', [
  state(
    'closed',
    style({
      height: '0px',
      overflow: 'hidden',
      opacity: 0,
    })
  ),
  state(
    'open',
    style({
      height: '*',
      overflow: 'hidden',
      opacity: 1,
    })
  ),
  transition('closed => open', [animate('300ms ease-out')]),
  transition('open => closed', [animate('300ms ease-in')]),
]);
