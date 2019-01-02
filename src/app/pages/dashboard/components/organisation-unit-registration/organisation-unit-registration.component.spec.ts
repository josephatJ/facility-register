import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationUnitRegistrationComponent } from './organisation-unit-registration.component';

describe('OrganisationUnitRegistrationComponent', () => {
  let component: OrganisationUnitRegistrationComponent;
  let fixture: ComponentFixture<OrganisationUnitRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationUnitRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationUnitRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
