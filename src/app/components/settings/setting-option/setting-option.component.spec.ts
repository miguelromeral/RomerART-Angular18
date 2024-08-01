import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingOptionComponent } from './setting-option.component';

describe('SettingOptionComponent', () => {
  let component: SettingOptionComponent;
  let fixture: ComponentFixture<SettingOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
