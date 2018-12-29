import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Params, Router} from '@angular/router';
import * as orgUnits from '../../../../store/organisation-units/organisation-units.actions';
import {getOrganisationUnitByID} from '../../../../store/organisation-units/organisation-units.selectors';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {OrganisationUnitsState} from '../../../../store/organisation-units/organisation-units.state';
import {AppState} from '../../../../store/app.reducers';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  @Input() orgUnitsObject: any;
  organisationUnit$: Observable<OrganisationUnitsState>;
  selectedItemId = '';
  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) {
    router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
      }
    });
  }

  ngOnInit() {
    if (this.orgUnitsObject['arrayed_org_units'].length > 0) {
      console.log('not new', this.orgUnitsObject);
      this.selectedItemId = this.orgUnitsObject['items'][0].id;
    } else {
      // get org unit and its children
      this.route.params.forEach((params: Params) => {
        if (params['id']) {
          this.selectedItemId = params['id'];
          this.store.dispatch(new orgUnits.LoadOrganisationUnitsAction(params['id']));
          this.organisationUnit$ = this.store.pipe(select(getOrganisationUnitByID));
          if (this.organisationUnit$) {
            this.organisationUnit$.subscribe((orgUnit) => {
              if (orgUnit) {
                const orgUnitObj = {
                  'items': []
                };
                orgUnitObj['items'].push(orgUnit);
                this.orgUnitsObject = orgUnitObj;
                console.log('new', this.orgUnitsObject);
              }
            });
          }
        }
      });
    }
  }

  getOrgUnitChildren(orgUnitsObject) {
    return orgUnitsObject['items'][0]['children'];
  }

  deleteThisItem(id, level) {
    // delete item
  }
}
