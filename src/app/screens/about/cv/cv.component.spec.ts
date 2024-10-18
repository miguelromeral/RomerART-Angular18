import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvComponent } from './cv.component';
import { TranslateModule } from '@ngx-translate/core';
import { MockCustomTranslatePipe } from '@app/pipes/translate/customotranslate.mock';

describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CvComponent,
        TranslateModule.forRoot(),
        // MockCustomTranslatePipe,
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
