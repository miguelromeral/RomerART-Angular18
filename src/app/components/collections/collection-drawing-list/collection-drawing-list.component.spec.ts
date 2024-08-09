import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDrawingListComponent } from './collection-drawing-list.component';

describe('CollectionDrawingListComponent', () => {
  let component: CollectionDrawingListComponent;
  let fixture: ComponentFixture<CollectionDrawingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionDrawingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionDrawingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
