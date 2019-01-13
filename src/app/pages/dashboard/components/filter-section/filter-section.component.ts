import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.css'],
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
export class FilterSectionComponent implements OnInit {

  @Input() selectOrgUnitId: string;
  @Output() organisationsDefinition: EventEmitter<any> = new EventEmitter<any>();
  showOrgUnitFilter: boolean;
  orgUnitsDefinition: any;
  orgUnitModel$: any;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.showOrgUnitFilter = false;
    this.orgUnitModel$ = new Observable((observer) => {
      observer.next({
        'selectionMode': 'Level',
        'selectedLevels': [],
        'showUpdateButton': true,
        'selectedGroups': [],
        'orgUnitLevels': [],
        'orgUnitGroups': [],
        'selectedOrgUnits': [
          {
            'id': this.selectOrgUnitId,
            'name': ''
          }
        ],
        'userOrgUnits': [],
        'type': 'report',
        'selectedUserOrgUnits': []
      });
    });
  }

  updateOrgUnit(orgUnitModel) {
    this.showOrgUnitFilter = false;
    this.orgUnitsDefinition = orgUnitModel;
    this.organisationsDefinition.emit(orgUnitModel);
    this.router.navigate(['/dashboard/' + orgUnitModel.typeOfAction + '/' + orgUnitModel['arrayed_org_units'][0][0].id]);
  }

}
