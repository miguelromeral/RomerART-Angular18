import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitleComponent } from './title.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  template: `
    <app-art-details-title
      [character]="character"
      [modelName]="modelName"
      [loading]="loading"></app-art-details-title>
  `,
})
class TestHostComponent {
  character = 'Test Character';
  modelName = 'Test Model';
  loading = true; // Cambia a false para probar el otro estado
}

describe('TitleComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent], // Declara TitleComponent y TestHostComponent
      imports: [TitleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display loading content when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();

    const loadingContent = fixture.debugElement.query(By.css('div[loading]'));
    const contentContent = fixture.debugElement.query(By.css('div[content]'));

    expect(loadingContent).toBeTruthy(); // Verifica que el contenedor de carga está presente
    expect(contentContent).toBeNull(); // Verifica que el contenido no está presente
  });

  it('should display loaded content when loading is false', () => {
    component.loading = false;
    fixture.detectChanges();

    const loadingContent = fixture.debugElement.query(By.css('div[loading]'));
    const contentContent = fixture.debugElement.query(By.css('div[content]'));

    // Verifica que el contenedor de carga no está presente
    expect(loadingContent).toBeNull();

    // Verifica que el contenido cargado está presente
    expect(contentContent).toBeTruthy();

    // Verifica el texto del contenido cargado
    const characterElement = fixture.debugElement.query(By.css('h3'));
    const modelNameElement = fixture.debugElement.query(
      By.css('h5.text-sm.italic')
    );

    expect(characterElement).toBeTruthy(); // Verifica que el nombre del personaje está presente
    expect(characterElement.nativeElement.textContent).toContain(
      'Test Character'
    ); // Verifica el texto del nombre del personaje

    expect(modelNameElement).toBeTruthy(); // Verifica que el modelo está presente
    expect(modelNameElement.nativeElement.textContent).toContain('Test Model'); // Verifica el texto del modelo
  });
});
