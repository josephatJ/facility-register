import {Component, Input, OnInit} from '@angular/core';
import * as helpers from '../../../helpers/index';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() orgUnitGroups: any;
  @Input() levelFourOrgUnits: number;
  @Input() selectedOrganisationUnit: string;
  @Input() datas: any;
  constructor() { }

  ngOnInit() {
    if (this.selectedOrganisationUnit) {
      console.log('selected organisation unit', this.selectedOrganisationUnit);
      // console.log('data', this.data);
    }
  }

  getDataForChart(selectedOrganisationUnit, orgUnitGroup, levelFourOrgUnits) {
    return helpers.getGroupSetInfoForChart(selectedOrganisationUnit, orgUnitGroup, levelFourOrgUnits)
  }
}
