import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import * as _ from 'lodash';
import * as helpers from '../../../helpers/index';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() orgUnitGroup: any;
  @Input() levelFourOrgUnits: any;
  @Input() selectedOrganisationUnit: string;
  Highcharts: any;
  chartOptions: any = null;

  isTrue: boolean = false;
  constructor() {
    this.isTrue = this.returnsTrue();
   }

  ngOnInit() {
    if (this.orgUnitGroup) {
      this.drawChart(this.orgUnitGroup, this.levelFourOrgUnits, this.selectedOrganisationUnit);
    }
  }

  drawChart(orgUnitGroup, levelFourOrgUnits, selectedOrganisationUnit) {
    this.Highcharts = Highcharts;
    const data = helpers.getGroupSetInfoForChart(selectedOrganisationUnit, orgUnitGroup, levelFourOrgUnits)
    if (data) {
      console.log('data', data);
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
    }
  }

  returnsTrue(): boolean {
    return true;
  }
}
