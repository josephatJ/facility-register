import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import * as _ from 'lodash';
import * as helpers from '../../helpers';

@Component({
  selector: 'app-general-stats',
  templateUrl: './general-stats.component.html',
  styleUrls: ['./general-stats.component.css']
})
export class GeneralStatsComponent implements OnInit {
  @Input() organisationUnitGroupSets: any;
  @Input() levelFourOrgUnits: any;
  @Input() selectedOrganisationUnit: string;
  selectedGroupId: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.organisationUnitGroupSets) {
      this.selectedGroupId = this.organisationUnitGroupSets[0].id;
      this.setSelectedGroup(this.selectedGroupId);
    }
  }

  setSelectedGroup(id) {
    this.selectedGroupId = id;
  }

  getCountOfFacilitiesForSelectedOu(selectedOrganisationUnit, orgUnitGroup, levelFourOrgUnits) {
    const returnedObj = helpers.getGroupSetInfoBySelectedOrgUnit(selectedOrganisationUnit, orgUnitGroup, levelFourOrgUnits);
    const overAllTotal = returnedObj['overAllTotal'];
    const groupFacilities = returnedObj['totalOrgUnitsInGroup'];
    return returnedObj;
  }

  getDataForChart(selectedOrganisationUnit, orgUnitGroup, levelFourOrgUnits) {
    return helpers.getGroupSetInfoForChart(selectedOrganisationUnit, orgUnitGroup, levelFourOrgUnits)
  }

  getActiveOrganisationGroup(groupSets, selectedGroupId) {
    let activeGroupSet = {};
    _.map(groupSets, (groupSet, index) => {
      if (groupSet.id === selectedGroupId) {
        activeGroupSet = groupSet;
      }
    });
    return activeGroupSet;
  }
}
