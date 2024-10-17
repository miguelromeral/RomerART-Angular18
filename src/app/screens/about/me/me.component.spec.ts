import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeComponent } from './me.component';
import { AboutService } from '@app/services/api/about/about.service';
import { TranslateModule } from '@ngx-translate/core';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let aboutServiceSpy: jasmine.SpyObj<AboutService>;

  beforeEach(async () => {
    const spyAbout = jasmine.createSpyObj('AboutService', ['getInspirations']);
    await TestBed.configureTestingModule({
      imports: [MeComponent, TranslateModule.forRoot()],
      providers: [{ provide: AboutService, useValue: spyAbout }],
    }).compileComponents();

    aboutServiceSpy = TestBed.inject(
      AboutService
    ) as jasmine.SpyObj<AboutService>;

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
