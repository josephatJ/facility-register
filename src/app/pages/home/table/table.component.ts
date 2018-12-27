import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  data: any;
  @Input() orgUnitGroup: any;
  @Input() totalNumberOfLevelFour: number;
  dataForTable: any;
  constructor() { }

  ngOnInit() {
    if (this.orgUnitGroup) {
      let totalOrgUnits = 0;
      const dataForTable = [];
      this.orgUnitGroup['organisationUnitGroups'].forEach((group) => {
        const obj = {
          'name': group.name,
          'numberOfOrgUnitsLevelFour': group.organisationUnits,
          'percentage': _.round((group.organisationUnits / this.totalNumberOfLevelFour) * 100, 2)
        };
        totalOrgUnits += group.organisationUnits;
        dataForTable.push(obj);
      });
      dataForTable.sort((a, b) => {
        const first = a.name.toLowerCase();
        const next = b.name.toLowerCase();
        if (first < next) {return -1; }
        if (first > next) {return 1; }
        return 0;
      });
      if (this.totalNumberOfLevelFour > totalOrgUnits) {
        dataForTable.push({'name': 'Others (not grouped)', 'numberOfOrgUnitsLevelFour': this.totalNumberOfLevelFour - totalOrgUnits, 'percentage': _.round(((this.totalNumberOfLevelFour - totalOrgUnits) / this.totalNumberOfLevelFour) * 100, 2)});
      }
      this.data = dataForTable;
    }
  }

  getDataForTable(data) {
    // return data.split(':');
  }
}
