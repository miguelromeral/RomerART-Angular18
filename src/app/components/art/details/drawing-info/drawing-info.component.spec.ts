import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingInfoComponent } from './drawing-info.component';

describe('DrawingInfoComponent', () => {
  let component: DrawingInfoComponent;
  let fixture: ComponentFixture<DrawingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
