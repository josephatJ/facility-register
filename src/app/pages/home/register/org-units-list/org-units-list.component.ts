import {Component, Input, OnInit} from '@angular/core';
import {PagerService} from '../../../../services/pager.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-org-units-list',
  templateUrl: './org-units-list.component.html',
  styleUrls: ['./org-units-list.component.css']
})
export class OrgUnitsListComponent implements OnInit {

  @Input() orgUnitsObject: any;
  selectedItemId: string;
  constructor(private pagerService: PagerService, private router: Router) {
    router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        console.log('loading indicator');
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        console.log('hide loading indicator');
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }

  ngOnInit() {
    this.selectedItemId = this.orgUnitsObject['items'][0].id;
  }

  getOrgUnitChildren(orgUnitsObject) {
    return orgUnitsObject['items'][0]['children'];
  }

  showSettingsOptions(orgId, level) {
    // show settings options
    console.log(level);
    this.selectedItemId = orgId;
  }
}
