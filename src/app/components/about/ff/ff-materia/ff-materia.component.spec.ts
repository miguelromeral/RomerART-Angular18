import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfMateriaComponent } from './ff-materia.component';

describe('FfMateriaComponent', () => {
  let component: FfMateriaComponent;
  let fixture: ComponentFixture<FfMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FfMateriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FfMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
