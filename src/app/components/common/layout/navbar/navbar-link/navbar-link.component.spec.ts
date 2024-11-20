import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLinkComponent } from './navbar-link.component';
import { ActivatedRoute } from '@angular/router';

describe('NavbarLinkComponent', () => {
  let component: NavbarLinkComponent;
  let fixture: ComponentFixture<NavbarLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLinkComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }, // Si necesitas agregar algo para ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
