import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgUnitsListComponent } from './org-units-list.component';

describe('OrgUnitsListComponent', () => {
  let component: OrgUnitsListComponent;
  let fixture: ComponentFixture<OrgUnitsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgUnitsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgUnitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
