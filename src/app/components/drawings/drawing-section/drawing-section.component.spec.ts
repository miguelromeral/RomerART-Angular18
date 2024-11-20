import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingSectionComponent } from '@app/components/drawings/details/section/section.component';

describe('DrawingSectionComponent', () => {
  let component: DrawingSectionComponent;
  let fixture: ComponentFixture<DrawingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
