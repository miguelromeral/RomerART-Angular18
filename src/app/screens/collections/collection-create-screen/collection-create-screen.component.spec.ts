import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionCreateScreenComponent } from '@app/screens/collections/create-collection/create-collection.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { FilterResultsDrawing } from '@models/responses/filter-drawing-response.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CollectionCreateScreenComponent', () => {
  let component: CollectionCreateScreenComponent;
  let fixture: ComponentFixture<CollectionCreateScreenComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async () => {
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
      'filterDrawingsAdmin',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CollectionCreateScreenComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [{ provide: DrawingService, useValue: spyDrawing }],
    }).compileComponents();

    drawingServiceSpy = TestBed.inject(
      DrawingService
    ) as jasmine.SpyObj<DrawingService>;

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

    fixture = TestBed.createComponent(CollectionCreateScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
