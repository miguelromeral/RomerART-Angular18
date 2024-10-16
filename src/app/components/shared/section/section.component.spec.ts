import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionComponent } from './section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should collapse', () => {
    component.collapsable = true;
    fixture.detectChanges();

    expect(component.isCollapsed)
      .withContext('initially not collapsed')
      .toBeFalsy();
    component.collapse();
    fixture.detectChanges();

    expect(component.isCollapsed)
      .withContext('if changed, now its collapased')
      .toBeTruthy();
    component.collapse();
    fixture.detectChanges();

    expect(component.isCollapsed)
      .withContext('on changed again, back to the initial state')
      .toBeFalsy();

    component.collapsable = false;
    fixture.detectChanges();

    component.collapse();
    fixture.detectChanges();
    expect(component.collapsable)
      .withContext('if not collapsable, it doesnt take any action')
      .toBeFalsy();
  });

  it('chould collapse if user clicks on header', () => {
    const componentDe: DebugElement = fixture.debugElement;
    // const componentEl: HTMLElement = componentDe.nativeElement;
    const titleDe: DebugElement = componentDe.query(By.css('.seccion-title'));

    component.collapsable = true;
    expect(component.isCollapsed)
      .withContext('initially not collapsed')
      .toBeFalsy();

    titleDe.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.isCollapsed)
      .withContext('when clicked title, it is now collapsed')
      .toBeTruthy();

    titleDe.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.isCollapsed)
      .withContext('on clicked again, visible again')
      .toBeFalsy();

    component.collapsable = false;
    fixture.detectChanges();

    expect(component.isCollapsed)
      .withContext('if the component is not collapsable, click does nothing')
      .toBeFalsy();
  });
});
