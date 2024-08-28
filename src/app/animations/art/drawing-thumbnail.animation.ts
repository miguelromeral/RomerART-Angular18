import {
  trigger,
  style,
  transition,
  animate,
  query,
  animateChild,
} from '@angular/animations';

export const drawingThumbnailAnimation = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0)' }),
    animate('300ms', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition(':leave', [
    animate('300ms', style({ opacity: 0, transform: 'scale(0)' })),
  ]),
]);

export const artGalleryAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(
      ':enter, :leave',
      [style({ opacity: 0, position: 'absolute', width: '100%' })],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))],
      { optional: true }
    ),
    query(
      ':leave',
      [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))],
      { optional: true }
    ),
    animateChild(),
  ]),
]);
