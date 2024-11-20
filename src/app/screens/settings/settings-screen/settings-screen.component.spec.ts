import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsScreenComponent } from './settings-screen.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageService } from '@app/services/language/language.service';

describe('SettingsScreenComponent', () => {
  let component: SettingsScreenComponent;
  let fixture: ComponentFixture<SettingsScreenComponent>;
  let languageServiceSpy: jasmine.SpyObj<LanguageService>;

  beforeEach(async () => {
    const spyLanguage = jasmine.createSpyObj('LanguageService', [
      'init',
      'changeLanguage',
      'translateText',
    ]);
    const activatedRouteSpy = jasmine.createSpyObj<ActivatedRoute>(
      'ActivatedRoute',
      [],
      {
        queryParams: of({ uno: 'one' }),
      }
    );

    await TestBed.configureTestingModule({
      imports: [
        SettingsScreenComponent,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: LanguageService, useValue: spyLanguage },
      ],
    }).compileComponents();

    languageServiceSpy = TestBed.inject(
      LanguageService
    ) as jasmine.SpyObj<LanguageService>;

    languageServiceSpy.translateText.and.returnValue(of('test'));

    fixture = TestBed.createComponent(SettingsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
