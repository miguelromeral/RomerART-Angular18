import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FfMateriaComponent } from './ff-materia.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FfMateriaComponent', () => {
  let component: FfMateriaComponent;
  let fixture: ComponentFixture<FfMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FfMateriaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FfMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change colors according to its type', () => {
    const componentDe: DebugElement = fixture.debugElement;
    const divMateriaDe: DebugElement = componentDe.query(By.css('.ff-materia'));
    const divMateria: HTMLElement = divMateriaDe.nativeElement;

    component.type = 1;
    fixture.detectChanges();
    expect(component.getMateriaClass()).toBe('summon');
    expect(divMateria.classList.contains('summon')).toBeTruthy();

    component.type = 2;
    fixture.detectChanges();
    expect(component.getMateriaClass()).toBe('support');
    expect(divMateria.classList.contains('support')).toBeTruthy();

    component.type = 3;
    fixture.detectChanges();
    expect(component.getMateriaClass()).toBe('magic');
    expect(divMateria.classList.contains('magic')).toBeTruthy();

    component.type = 0;
    fixture.detectChanges();
    expect(component.getMateriaClass()).toBe('');
    expect(divMateria.classList.contains('summon')).toBeFalsy();
    expect(divMateria.classList.contains('support')).toBeFalsy();
    expect(divMateria.classList.contains('magic')).toBeFalsy();
  });
});
