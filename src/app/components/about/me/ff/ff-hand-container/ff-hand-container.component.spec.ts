import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfHandContainerComponent } from './ff-hand-container.component';

describe('FfHandContainerComponent', () => {
  let component: FfHandContainerComponent;
  let fixture: ComponentFixture<FfHandContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FfHandContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FfHandContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
