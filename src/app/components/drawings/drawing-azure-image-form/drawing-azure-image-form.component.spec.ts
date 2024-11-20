import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingAzureImageFormComponent } from '../../../../../../app/components/art/form/azure-image-form/azure-image-form.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { TranslateModule } from '@ngx-translate/core';

describe('DrawingAzureImageFormComponent', () => {
  let component: DrawingAzureImageFormComponent;
  let fixture: ComponentFixture<DrawingAzureImageFormComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async () => {
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
    ]);

    await TestBed.configureTestingModule({
      imports: [DrawingAzureImageFormComponent, TranslateModule.forRoot()],
      providers: [{ provide: DrawingService, useValue: spyDrawing }],
    }).compileComponents();

    drawingServiceSpy = TestBed.inject(
      DrawingService
    ) as jasmine.SpyObj<DrawingService>;

    fixture = TestBed.createComponent(DrawingAzureImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
