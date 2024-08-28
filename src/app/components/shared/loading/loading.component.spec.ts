import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-loading [loading]="isLoading">
      <div loading>Loading content...</div>
      <div content>Loaded content!</div>
    </app-loading>
  `,
})
class TestHostComponent {
  isLoading = true; // Cambia a false para probar el otro estado
}

describe('LoadingComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [LoadingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display loading content when loading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingContent = fixture.debugElement.query(By.css('.skeleton'));
    const loadedContent = fixture.debugElement.query(By.css('[content]'));

    expect(loadingContent).toBeTruthy(); // Verifica que el contenedor de carga está presente
    expect(loadedContent).toBeNull(); // Verifica que el contenido cargado no está presente
  });

  it('should display loaded content when loading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();

    const loadingContent = fixture.debugElement.query(By.css('.skeleton'));
    const loadedContent = fixture.debugElement.query(By.css('[content]'));

    expect(loadingContent).toBeNull(); // Verifica que el contenedor de carga no está presente
    expect(loadedContent).toBeTruthy(); // Verifica que el contenido cargado está presente
  });
});
