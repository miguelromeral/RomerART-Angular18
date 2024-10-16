import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomImageComponent } from './zoom-image.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ZoomImageComponent', () => {
  let component: ZoomImageComponent;
  let fixture: ComponentFixture<ZoomImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoomImageComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ZoomImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
