import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeScreenComponent } from './home-screen.component';
import { TranslateModule } from '@ngx-translate/core';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { of } from 'rxjs';
import { Collection } from '@models/art/collection.model';

describe('HomeScreenComponent', () => {
  let component: HomeScreenComponent;
  let fixture: ComponentFixture<HomeScreenComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async () => {
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
      'getCollectionDetails',
    ]);

    await TestBed.configureTestingModule({
      imports: [HomeScreenComponent, TranslateModule.forRoot()],
      providers: [{ provide: DrawingService, useValue: spyDrawing }],
    }).compileComponents();

    drawingServiceSpy = TestBed.inject(
      DrawingService
    ) as jasmine.SpyObj<DrawingService>;

    const mockCollection: Collection = {
      id: '',
      description: '',
      drawings: [],
      drawingsId: [],
      label: '',
      labelCode: '',
      name: '',
      order: 1,
      textDrawingsReferences: '',
      value: '',
    };
    drawingServiceSpy.getCollectionDetails.and.returnValue(of(mockCollection));

    fixture = TestBed.createComponent(HomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
