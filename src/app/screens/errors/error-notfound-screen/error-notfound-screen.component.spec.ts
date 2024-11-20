import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNotfoundScreenComponent } from './error-notfound-screen.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ErrorNotfoundScreenComponent', () => {
  let component: ErrorNotfoundScreenComponent;
  let fixture: ComponentFixture<ErrorNotfoundScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorNotfoundScreenComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorNotfoundScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
