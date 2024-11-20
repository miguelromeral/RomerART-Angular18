import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfProgressBarComponent } from './ff-progress-bar.component';

describe('FfProgressBarComponent', () => {
  let component: FfProgressBarComponent;
  let fixture: ComponentFixture<FfProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FfProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FfProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
