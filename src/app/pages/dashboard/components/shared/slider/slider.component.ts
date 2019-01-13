import {Component, Input, OnInit} from '@angular/core';
import * as helpers from '../../../helpers/index';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() orgUnitGroups: any;
  @Input() levelFourOrgUnits: any;
  @Input() selectedOrganisationUnit: string;
  @Input() datas: any;
  constructor() { }

  ngOnInit() {
  }
}
