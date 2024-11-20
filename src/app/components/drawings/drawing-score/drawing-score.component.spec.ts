import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingScoreComponent } from './drawing-score.component';

describe('DrawingScoreComponent', () => {
  let component: DrawingScoreComponent;
  let fixture: ComponentFixture<DrawingScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
