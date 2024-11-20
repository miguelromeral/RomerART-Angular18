import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutCvScreenComponent } from './about-cv-screen.component';
import { TranslateModule } from '@ngx-translate/core';
import { MockCustomTranslatePipe } from '@app/pipes/translate/customotranslate.mock';

describe('AboutCvScreenComponent', () => {
  let component: AboutCvScreenComponent;
  let fixture: ComponentFixture<AboutCvScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AboutCvScreenComponent,
        TranslateModule.forRoot(),
        // MockCustomTranslatePipe,
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutCvScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
