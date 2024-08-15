import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatableComponent } from './translatable.component';

describe('TranslatableComponent', () => {
  let component: TranslatableComponent;
  let fixture: ComponentFixture<TranslatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslatableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
