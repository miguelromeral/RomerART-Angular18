import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeScreenComponent } from './about-me-screen.component';
import { AboutService } from '@app/services/api/about/about.service';
import { TranslateModule } from '@ngx-translate/core';

describe('AboutMeScreenComponent', () => {
  let component: AboutMeScreenComponent;
  let fixture: ComponentFixture<AboutMeScreenComponent>;
  let aboutServiceSpy: jasmine.SpyObj<AboutService>;

  beforeEach(async () => {
    const spyAbout = jasmine.createSpyObj('AboutService', ['getInspirations']);
    await TestBed.configureTestingModule({
      imports: [AboutMeScreenComponent, TranslateModule.forRoot()],
      providers: [{ provide: AboutService, useValue: spyAbout }],
    }).compileComponents();

    aboutServiceSpy = TestBed.inject(
      AboutService
    ) as jasmine.SpyObj<AboutService>;

    fixture = TestBed.createComponent(AboutMeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
