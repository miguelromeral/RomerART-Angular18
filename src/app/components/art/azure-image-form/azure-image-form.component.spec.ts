import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureImageFormComponent } from './azure-image-form.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { TranslateModule } from '@ngx-translate/core';

describe('AzureImageFormComponent', () => {
  let component: AzureImageFormComponent;
  let fixture: ComponentFixture<AzureImageFormComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async () => {
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
    ]);

    await TestBed.configureTestingModule({
      imports: [AzureImageFormComponent, TranslateModule.forRoot()],
      providers: [{ provide: DrawingService, useValue: spyDrawing }],
    }).compileComponents();

    drawingServiceSpy = TestBed.inject(
      DrawingService
    ) as jasmine.SpyObj<DrawingService>;

    fixture = TestBed.createComponent(AzureImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
