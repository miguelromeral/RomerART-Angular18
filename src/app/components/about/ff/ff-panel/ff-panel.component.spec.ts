import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfPanelComponent } from './ff-panel.component';

describe('FfPanelComponent', () => {
  let component: FfPanelComponent;
  let fixture: ComponentFixture<FfPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FfPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FfPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
