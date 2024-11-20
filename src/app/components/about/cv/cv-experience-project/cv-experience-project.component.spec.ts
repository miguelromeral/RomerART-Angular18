import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvExperienceProjectComponent } from '@app/components/about/cv/experience-project/experience-project.component';
import { TranslateModule } from '@ngx-translate/core';

describe('CvExperienceProjectComponent', () => {
  let component: CvExperienceProjectComponent;
  let fixture: ComponentFixture<CvExperienceProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvExperienceProjectComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CvExperienceProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
