import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFormComponent } from './filter-form.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Collection } from '@models/art/collection.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawingProduct } from '@models/art/drawing-product.model';
import { DrawingCharacter } from '@models/art/drawing-character.model';

describe('FilterFormComponent', () => {
  let component: FilterFormComponent;
  let fixture: ComponentFixture<FilterFormComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async () => {
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
      'getDrawingStyles',
      'getDrawingSoftwares',
      'getDrawingFilterEffects',
      'getDrawingPaperSizes',
      'getDrawingProductTypes',
      'getDrawingProducts',
      'getDrawingCharacters',
      'getDrawingModels',
    ]);
    const activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>(
      'ActivatedRoute',
      [],
      {
        queryParams: of({ uno: 'one' }),
      }
    );

    await TestBed.configureTestingModule({
      imports: [
        FilterFormComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: DrawingService, useValue: spyDrawing },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    drawingServiceSpy = TestBed.inject(
      DrawingService
    ) as jasmine.SpyObj<DrawingService>;

    const mockCollections: Collection[] = [
      {
        id: '',
        description: '',
        drawings: [],
        drawingIds: [],
        label: '',
        labelCode: '',
        name: '',
        order: 1,
        textDrawingsReferences: '',
        value: '',
      },
    ];
    drawingServiceSpy.getAllCollections.and.returnValue(of(mockCollections));
    const mockProducts: DrawingProduct[] = [
      {
        label: 'label',
        labelCode: 'CODE',
        productName: 'Product',
        productType: 'Type',
        productTypeId: 1,
        value: 'value',
      },
    ];
    drawingServiceSpy.getDrawingProducts.and.returnValue(of(mockProducts));
    const mockDrawings: DrawingCharacter[] = [
      {
        characterName: 'Character',
        label: 'label',
        labelCode: 'CODE',
        productType: 'Product',
        productTypeId: 1,
        value: 'value',
      },
    ];
    drawingServiceSpy.getDrawingCharacters.and.returnValue(of(mockDrawings));
    const mockModels: string[] = ['model1', 'model2'];
    drawingServiceSpy.getDrawingModels.and.returnValue(of(mockModels));

    fixture = TestBed.createComponent(FilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
