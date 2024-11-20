import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingTabPanelComponent } from '@app/components/drawings/details/tab-panel/tab-panel.component';

describe('DrawingTabPanelComponent', () => {
  let component: DrawingTabPanelComponent;
  let fixture: ComponentFixture<DrawingTabPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingTabPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingTabPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
