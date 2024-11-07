import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialErrorComponent } from './partial-error.component';

describe('PartialErrorComponent', () => {
  let component: PartialErrorComponent;
  let fixture: ComponentFixture<PartialErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartialErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartialErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
