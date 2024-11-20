import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutIndexScreenComponent } from './about-index-screen.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AboutIndexScreenComponent', () => {
  let component: AboutIndexScreenComponent;
  let fixture: ComponentFixture<AboutIndexScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutIndexScreenComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutIndexScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
