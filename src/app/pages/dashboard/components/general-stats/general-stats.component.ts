import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import * as _ from 'lodash';
import * as helpers from '../../helpers';
import { Observable } from 'rxjs';
import { OrganisationUnitsState } from 'src/app/store/organisation-units/organisation-units.state';
import * as orgUnits from '../../../../store/organisation-units/organisation-units.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { getOrganisationUnitByID } from 'src/app/store/organisation-units/organisation-units.selectors';
import { HttpClientService } from 'src/app/services/http-client.service';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-general-stats',
  templateUrl: './general-stats.component.html',
  styleUrls: ['./general-stats.component.css']
})
export class GeneralStatsComponent implements OnInit {
  @Input() organisationUnitGroupSets: any;
  @Input() levelFourOrgUnits: any;
  @Input() selectedOrganisationUnit: string;
  @Input() selectedOrgUnitDefinition: any;
  @Input() datasForChart: any;
  @Output() selectedGroupSetId: EventEmitter<any> = new EventEmitter<any>();
  dataForChart: any;
  selectedGroupId: string;
  selectedOrgUnitInfo$: Observable<OrganisationUnitsState>;

  Highcharts: any;
  chartOptions: any = null;
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private httpClientService: HttpClientService) { }

  ngOnInit() {
    if (this.organisationUnitGroupSets) {
      this.selectedGroupId = this.organisationUnitGroupSets[0].id;
      this.setSelectedGroup(this.selectedGroupId);
    }
  }

  setSelectedGroup(id) {
    this.selectedGroupId = id;
    this.selectedGroupSetId.emit(id);
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

  drawChart(orgUnitGroup,  data) {
    this.Highcharts = Highcharts;
    // const datas = helpers.getGroupSetInfoForChart(selectedOrganisationUnit, orgUnitGroup, levelFourOrgUnits)
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: orgUnitGroup.name
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: orgUnitGroup.name,
        colorByPoint: true,
        data: data
      }]
    };
    console.log(this.chartOptions);
    this.chartOptions;
  }
}
