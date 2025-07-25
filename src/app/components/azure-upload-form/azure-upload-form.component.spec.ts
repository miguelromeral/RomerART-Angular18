import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureUploadFormComponent } from './azure-upload-form.component';

describe('AzureUploadFormComponent', () => {
  let component: AzureUploadFormComponent;
  let fixture: ComponentFixture<AzureUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AzureUploadFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzureUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
