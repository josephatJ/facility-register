import {Component, Input, OnInit} from '@angular/core';
import {PagerService} from '../../../../services/pager.service';

@Component({
  selector: 'app-org-units-list',
  templateUrl: './org-units-list.component.html',
  styleUrls: ['./org-units-list.component.css']
})
export class OrgUnitsListComponent implements OnInit {

  @Input() orgUnitsObject: any;
  orgUnitsChildren: any;
  pagedItems: any[];
  // pager object
  pager: any = {};
  constructor(private pagerService: PagerService) { }

  ngOnInit() {
    if (this.orgUnitsObject) {
      this.orgUnitsChildren = this.orgUnitsObject['arrayed_org_units'][0][0]['children'];
      this.setPage(1);
      console.log(JSON.stringify(this.orgUnitsObject['arrayed_org_units'][0][0]));
    }
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.orgUnitsChildren.length, page);

    // get current page of items
    this.pagedItems = this.orgUnitsChildren.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
