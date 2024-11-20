import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingFormComponent } from './drawing-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { DrawingService } from '@app/services/api/drawing/drawing.service';

describe('DrawingFormComponent', () => {
  let component: DrawingFormComponent;
  let fixture: ComponentFixture<DrawingFormComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async () => {
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
      'getDrawingStyles',
      'getDrawingSoftwares',
      'getDrawingFilterEffects',
      'getDrawingPaperSizes',
      'getDrawingProductTypes',
    ]);

    await TestBed.configureTestingModule({
      imports: [DrawingFormComponent, TranslateModule.forRoot()],
      providers: [{ provide: DrawingService, useValue: spyDrawing }],
    }).compileComponents();

    drawingServiceSpy = TestBed.inject(
      DrawingService
    ) as jasmine.SpyObj<DrawingService>;

    fixture = TestBed.createComponent(DrawingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
