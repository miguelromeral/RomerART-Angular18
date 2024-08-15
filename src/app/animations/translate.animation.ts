import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const translateAnimation = trigger('translateAnimation', [
  state(
    'original',
    style({
      height: '0px',
      overflow: 'hidden',
      opacity: 0,
    })
  ),
  state(
    'translation',
    style({
      height: '*',
      overflow: 'hidden',
      opacity: 0.8,
    })
  ),
  transition('original => translation', [animate('300ms ease-out')]),
  transition('translation => original', [animate('300ms ease-in')]),
]);

export const translateTextAnimation = trigger('translateTextAnimation', [
  state(
    'original',
    style({
      opacity: 1,
    })
  ),
  state(
    'loading',
    style({
      opacity: 0.5,
    })
  ),
  state(
    'translated',
    style({
      opacity: 1,
    })
  ),
  transition('* => *', [animate('150ms ease-in-out')]),
]);
