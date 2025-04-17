import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionFormComponent } from './collection-form.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { TranslateModule } from '@ngx-translate/core';
import { Collection } from '@models/art/collection.model';
import { of } from 'rxjs';
import { FilterResultsDrawing } from '@models/responses/filter-drawing-response.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CollectionFormComponent', () => {
  let component: CollectionFormComponent;
  let fixture: ComponentFixture<CollectionFormComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async () => {
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
      'filterDrawingsAdmin',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CollectionFormComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [{ provide: DrawingService, useValue: spyDrawing }],
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

    const mockFilterAdmin: FilterResultsDrawing = {
      fetchedCount: 0,
      filteredCollections: [],
      filteredDrawingCharacters: [],
      filteredDrawingModels: [],
      filteredDrawingPapers: [],
      filteredDrawingProducts: [],
      filteredDrawingProductTypes: [],
      filteredDrawings: [],
      filteredDrawingSoftwares: [],
      filteredDrawingStyles: [],
      moreToFetch: false,
      nDrawingCharacters: 0,
      nDrawingCollections: 0,
      nDrawingFavorites: 0,
      nDrawingModels: 0,
      nDrawingPapers: 0,
      nDrawingProducts: 0,
      nDrawingProductTypes: 0,
      nDrawingSoftwares: 0,
      nDrawingTypes: 0,
      totalCount: 0,
      totalDrawings: [],
      totalTime: 0,
    };
    drawingServiceSpy.filterDrawingsAdmin.and.returnValue(of(mockFilterAdmin));

    fixture = TestBed.createComponent(CollectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
