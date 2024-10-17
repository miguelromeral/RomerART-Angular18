import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async () => {
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
      'getDrawingStyles',
      'getDrawingSoftwares',
      'getDrawingFilterEffects',
      'getDrawingPaperSizes',
      'getDrawingProductTypes',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CreateComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [{ provide: DrawingService, useValue: spyDrawing }],
    }).compileComponents();

    drawingServiceSpy = TestBed.inject(
      DrawingService
    ) as jasmine.SpyObj<DrawingService>;

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
