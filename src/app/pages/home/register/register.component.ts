import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('open', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate(700)
      ]),
      transition('* => void', [
        animate(300),
        style({
          opacity: 0
        }),
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {

  showOrgUnitFilter: boolean;
  orgUnitsDefinition: any;
  orgUnitModel$ = new Observable((observer) => {
    observer.next({
      'selectionMode': 'Level',
      'selectedLevels': [],
      'showUpdateButton': true,
      'selectedGroups': [],
      'orgUnitLevels': [],
      'orgUnitGroups': [],
      'selectedOrgUnits': [
        {
          'id': 'm0frOspS7JY',
          'name': 'MOH - Tanzania'
        }
      ],
      'userOrgUnits': [],
      'type': 'report',
      'selectedUserOrgUnits': []
    });
  });
  constructor() {
  }

  ngOnInit() {
    this.showOrgUnitFilter = false;
  }

  updateOrgUnit(orgUnitModel) {
    this.showOrgUnitFilter = false;
    this.orgUnitsDefinition = null;
    this.orgUnitsDefinition = orgUnitModel;
      if (orgUnitModel.items && orgUnitModel.items.length > 0) {
        const nonOrgUnitItems = orgUnitModel.items.filter(
          (item: any) =>
            item.id.indexOf('LEVEL') !== -1 ||
            item.id.indexOf('OU_GROUP') !== -1
        );
        const orgUnitItems = orgUnitModel.items.filter(
          (item: any) =>
            item.id.indexOf('LEVEL') === -1 &&
            item.id.indexOf('OU_GROUP') === -1
        );

        if (orgUnitItems.length > 0) {
          orgUnitModel.globalItem = {
                id:
                  nonOrgUnitItems.length > 0
                    ? orgUnitItems[0].id +
                    ';LEVEL-' +
                    orgUnitItems[0].level +
                    ';' +
                    nonOrgUnitItems.map(item => item.id).join(';')
                    : orgUnitItems[0].id,
                name:
                  nonOrgUnitItems.length > 0
                    ? nonOrgUnitItems.map(item => item.name).join(', ') +
                    ' in ' +
                    orgUnitItems[0].name
                    : orgUnitItems[0].name
          };
        }
      }
  }
}
