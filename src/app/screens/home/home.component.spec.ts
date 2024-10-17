import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { of } from 'rxjs';
import { Collection } from '@models/art/collection.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let drawingServiceSpy: jasmine.SpyObj<DrawingService>;

  beforeEach(async () => {
    const spyDrawing = jasmine.createSpyObj('DrawingService', [
      'getAllCollections',
      'getCollectionDetails',
    ]);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot()],
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

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
