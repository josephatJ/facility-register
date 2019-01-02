import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';
import * as helpers from '../../../helpers/index';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  data: any;
  @Input() orgUnitGroup: any;
  @Input() levelFourOrgUnits: any;
  @Input() selectedOrganisationUnit: string;
  dataForTable: any;
  constructor() { }

  ngOnInit() {
  }

  getDataForTable(selectedOrganisationUnit, orgUnitGroup, levelFourOrgUnits) {
    const returnedObj = helpers.getGroupSetInfoBySelectedOrgUnit(selectedOrganisationUnit, orgUnitGroup, levelFourOrgUnits);
    const dataForTable = returnedObj['dataForTable'];
    const totalOrgUnitsInGroup = returnedObj['totalOrgUnitsInGroup'];
    const overAllTotal = returnedObj['overAllTotal'];
    dataForTable.sort((a, b) => {
      const first = a.name.toLowerCase();
      const next = b.name.toLowerCase();
      if (first < next) {return -1; }
      if (first > next) {return 1; }
      return 0;
    });
    if (overAllTotal > totalOrgUnitsInGroup) {
      dataForTable.push({'name': 'Others (not grouped)', 'numberOfOrgUnitsLevelFour': overAllTotal - totalOrgUnitsInGroup, 'percentage': _.round(((overAllTotal - totalOrgUnitsInGroup) / overAllTotal) * 100, 1)});
    }
    return dataForTable;
  }
}
