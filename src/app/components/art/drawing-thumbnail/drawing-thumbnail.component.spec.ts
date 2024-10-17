import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingThumbnailComponent } from './drawing-thumbnail.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DrawingThumbnailComponent', () => {
  let component: DrawingThumbnailComponent;
  let fixture: ComponentFixture<DrawingThumbnailComponent>;

  beforeEach(async () => {
    const activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>(
      'ActivatedRoute',
      [],
      {
        queryParams: of({ uno: 'one' }),
      }
    );

    await TestBed.configureTestingModule({
      imports: [
        DrawingThumbnailComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawingThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
