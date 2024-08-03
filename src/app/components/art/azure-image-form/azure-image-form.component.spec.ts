import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureImageFormComponent } from './azure-image-form.component';

describe('AzureImageFormComponent', () => {
  let component: AzureImageFormComponent;
  let fixture: ComponentFixture<AzureImageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AzureImageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzureImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
