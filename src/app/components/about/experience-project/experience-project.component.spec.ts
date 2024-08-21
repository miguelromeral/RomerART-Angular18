import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceProjectComponent } from './experience-project.component';

describe('ExperienceProjectComponent', () => {
  let component: ExperienceProjectComponent;
  let fixture: ComponentFixture<ExperienceProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
