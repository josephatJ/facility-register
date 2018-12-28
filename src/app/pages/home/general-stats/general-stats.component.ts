import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-general-stats',
  templateUrl: './general-stats.component.html',
  styleUrls: ['./general-stats.component.css']
})
export class GeneralStatsComponent implements OnInit {
  @Input() organisationUnitGroupSets: any;
  @Input() levelFourOrgUnits: any;
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
}
