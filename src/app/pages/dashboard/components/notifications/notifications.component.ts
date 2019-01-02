import {Component, Input, OnInit} from '@angular/core';
import * as dataStore from '../../../../store/dhis2-data-store/dhis2-data-store.actions';
import {select, Store} from '@ngrx/store';
import {getUnConfirmedOrgUnitsFromDataStore, getUserAccess} from '../../../../store/dhis2-data-store/dhis2-data-store.selectors';
import {Observable} from 'rxjs';
import {OrganisationUnitFromStoreState, UserAccessState} from '../../../../store/dhis2-data-store/dhis2-data-store.state';
import {AppState} from '../../../../store/app.reducers';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  unConfirmedOrgUnitsFromDataStore$: Observable<OrganisationUnitFromStoreState>;
  @Input() currentUserInfo: any;
  listOfUnConfirmedUnits: any = [];
  userAccess$: Observable<UserAccessState>;
  isManageNotification: boolean;
  hasAccessToView: boolean;
  constructor(private store: Store<AppState>) {
    this.isManageNotification = false;
    this.hasAccessToView = false;
    this.userAccess$ = store.pipe(select(getUserAccess));
  }

  ngOnInit() {
    this.listOfUnConfirmedUnits = [];
    if (this.currentUserInfo && this.userAccess$) {
      this.userAccess$.subscribe((userAccess) => {
        if (userAccess) {
          const possibleAccessGroups = [];
          this.currentUserInfo['userGroups'].forEach((userGroup) => {
            if (userAccess.accessGroups[userGroup.id]) {
              possibleAccessGroups.push(userAccess.accessGroups[userGroup.id]);
            }
          });
          possibleAccessGroups.sort((a, b) => {
            const first = a.priority;
            const next = b.priority;
            return first - next;
          });
          if (possibleAccessGroups[0].access.indexOf('C') >= 0) {
            this.hasAccessToView = true;
          }
          this.store.dispatch(new dataStore.LoadOrgUnitsFromDataStoreAction());
          this.unConfirmedOrgUnitsFromDataStore$ = this.store.pipe(select(getUnConfirmedOrgUnitsFromDataStore));
          if (this.unConfirmedOrgUnitsFromDataStore$) {
            this.unConfirmedOrgUnitsFromDataStore$.subscribe((orgUnits) => {
              if (orgUnits) {
                const facilitiesBelongingToThisUser = [];
                orgUnits.organisationUnits.forEach((facilityDetails) => {
                  if (facilityDetails.path.indexOf(this.currentUserInfo['dataViewOrganisationUnits'][0].id) >= 0) {
                    facilitiesBelongingToThisUser.push(facilityDetails);
                  }
                });
                if (facilitiesBelongingToThisUser.length > 0) {}
                this.listOfUnConfirmedUnits = facilitiesBelongingToThisUser;
              }
            });
          }
        }
      });
    }
  }

  setManageNotification(e, isManageNotification) {
    this.isManageNotification = !this.isManageNotification;
  }

  confirmOrgUnit(orgUnitProperties) {
    if (orgUnitProperties.action === 'add') {
      console.log('add'); // post
      console.log(orgUnitProperties);
    } else {
      console.log('edit'); // put
    }
  }

  getOrgUnitLevel(path) {
    return path.split('/').length - 1;
  }
}
