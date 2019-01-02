import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrgRegistrationComponent } from './confirm-org-registration.component';

describe('ConfirmOrgRegistrationComponent', () => {
  let component: ConfirmOrgRegistrationComponent;
  let fixture: ComponentFixture<ConfirmOrgRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmOrgRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOrgRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
