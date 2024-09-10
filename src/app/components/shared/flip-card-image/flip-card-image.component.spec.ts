import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipCardImageComponent } from './flip-card-image.component';

describe('FlipCardImageComponent', () => {
  let component: FlipCardImageComponent;
  let fixture: ComponentFixture<FlipCardImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlipCardImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlipCardImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
