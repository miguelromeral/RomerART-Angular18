import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingInfoComponent } from './drawing-info.component';
import { TranslateModule } from '@ngx-translate/core';

describe('DrawingInfoComponent', () => {
  let component: DrawingInfoComponent;
  let fixture: ComponentFixture<DrawingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawingInfoComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
