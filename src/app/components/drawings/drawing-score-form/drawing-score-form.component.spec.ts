import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingScoreFormComponent } from '@app/components/drawings/details/score-board/score-board.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { TranslateModule } from '@ngx-translate/core';

describe('DrawingScoreFormComponent', () => {
  let component: DrawingScoreFormComponent;
  let fixture: ComponentFixture<DrawingScoreFormComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async () => {
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
    ]);

    await TestBed.configureTestingModule({
      imports: [DrawingScoreFormComponent, TranslateModule.forRoot()],
      providers: [{ provide: DrawingService, useValue: spyDrawing }],
    }).compileComponents();

    drawingServiceSpy = TestBed.inject(
      DrawingService
    ) as jasmine.SpyObj<DrawingService>;

    fixture = TestBed.createComponent(DrawingScoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
