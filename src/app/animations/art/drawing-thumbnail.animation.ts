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
    style({ opacity: 0, transform: 'rotate3d(2, 5, 0, 90deg)' }),
    animate(
      '300ms',
      style({ opacity: 1, transform: 'rotate3d(0, 0, 0, 0deg)' })
    ),
  ]),
  // transition(':leave', [
  //   animate(
  //     '5000ms',
  //     style({ opacity: 0, transform: 'transform: rotate3d(1, 1, 0, -360deg)' })
  //   ),
  // ]),
]);

export const artGalleryAnimation = trigger('listAnimation', [
  // transition('* <=> *', [
  //   query(
  //     ':enter, :leave',
  //     [style({ opacity: 0, position: 'relative', width: '100%' })],
  //     { optional: true }
  //   ),
  //   query(
  //     ':enter',
  //     [style({ opacity: 0 }), animate('10000ms', style({ opacity: 1 }))],
  //     { optional: true }
  //   ),
  //   query(
  //     ':leave',
  //     [style({ opacity: 1 }), animate('10000ms', style({ opacity: 0 }))],
  //     { optional: true }
  //   ),
  //   animateChild(),
  // ]),
]);
