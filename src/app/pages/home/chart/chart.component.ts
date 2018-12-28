import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() orgUnitGroup: any;
  @Input() totalNumberOfLevelFour: number;
  Highcharts: any;
  chartOptions: any;
  sortedData: any;
  constructor() { }

  ngOnInit() {
    if (this.orgUnitGroup) {
      this.Highcharts = Highcharts;
      const data = [];
      let totalOrgUnits = 0;
      this.orgUnitGroup['organisationUnitGroups'].forEach((group) => {
        const obj = {
          'name': group.name,
          'y': group.organisationUnits
        };
        totalOrgUnits += group.organisationUnits;
        data.push(obj);
      });
      data.sort((a, b) => {
        const first = a.name.toLowerCase();
        const next = b.name.toLowerCase();
        if (first < next) {return -1; }
        if (first > next) {return 1; }
        return 0;
      });
      data.push({'name': 'Others', 'y': this.totalNumberOfLevelFour - totalOrgUnits});
      this.chartOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: this.orgUnitGroup.name
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
          name: this.orgUnitGroup.name,
          colorByPoint: true,
          data: data
        }]
      };
    }
  }

}
