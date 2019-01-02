import {Component, Input, OnInit} from '@angular/core';

import { OrganisationUnitLevelFour } from './organisation-unit';
import {HttpClientService} from '../../../../services/http-client.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {DataSetsState} from '../../../../store/data-sets/data-sets.state';
import * as currentUser from '../../../../store/current-user/current-user.actions';
import * as dataStore from '../../../../store/dhis2-data-store/dhis2-data-store.actions';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import * as dataSetsActions from '../../../../store/data-sets/data-sets.actions';
import {getDataSets} from '../../../../store/data-sets/data-sets.selectors';
import {getCurrentUser} from '../../../../store/current-user/current-user.selectors';
import {CurrentUserState} from '../../../../store/current-user/current-user.state';
import {OrganisationUnitFromStoreState, UserAccessState} from '../../../../store/dhis2-data-store/dhis2-data-store.state';
import {getUnConfirmedOrgUnitsFromDataStore, getUserAccess} from '../../../../store/dhis2-data-store/dhis2-data-store.selectors';

import * as helpers from '../../helpers/index';

@Component({
  selector: 'app-organisation-unit-registration',
  templateUrl: './organisation-unit-registration.component.html',
  styleUrls: ['./organisation-unit-registration.component.css']
})
export class OrganisationUnitRegistrationComponent implements OnInit {

  model: any;
  submitted: boolean;
  dataSets: any;
  createMessage: any;
  selectedItems = [];
  dataSets$: Observable<DataSetsState>;
  availableDataSets: any;
  @Input() level: number;
  @Input() parent: string;
  @Input() typeOfAction: string;
  currentUser$: Observable<CurrentUserState>;
  userAccess$: Observable<UserAccessState>;
  unConfirmedOrgUnitsFromdDataStore$: Observable<OrganisationUnitFromStoreState>;
  accessGroup: any;
  userInformation: any;
  constructor(private httpClientService: HttpClientService, private router: Router, private store: Store<AppState>) {
    // store.dispatch(new currentUser.LoadCurrentUserAction());
    // store.dispatch(new dataStore.LoadUserAccessAction());
    store.dispatch(new dataSetsActions.LoadDataSetsAction());
    this.currentUser$ = store.pipe(select(getCurrentUser));
    this.userAccess$ = store.pipe(select(getUserAccess));
    this.dataSets$ = store.pipe(select(getDataSets));
  }

  ngOnInit() {
    if (this.currentUser$ && this.userAccess$) {
      this.currentUser$.subscribe((userInfo) => {
        if (userInfo) {
          this.userInformation = userInfo;
          this.userAccess$.subscribe((userAccess) => {
            if (userAccess) {
              const possibleAccessGroups = [];
              userInfo['userGroups'].forEach((userGroup) => {
                if (userAccess.accessGroups[userGroup.id]) {
                  possibleAccessGroups.push(userAccess.accessGroups[userGroup.id]);
                }
              });
              possibleAccessGroups.sort((a, b) => {
                const first = a.priority;
                const next = b.priority;
                return first - next;
              });
              this.accessGroup = possibleAccessGroups[0];

              if (this.typeOfAction === 'add') {
                this.dataSets = ['L&D', 'ANC'];
                if (this.dataSets$) {
                  this.dataSets$.subscribe((dataSets) => {
                    if (dataSets) {
                      this.availableDataSets = dataSets.dataSets;
                    }
                  });
                }
                this.model = new OrganisationUnitLevelFour('1WsUihtSytA', 'Facility XXXX', 'Facility XXXX', 'Facility XXXX', 'this is description', '20-12-2018', '20-12-2018', 'This is comment', 'Josephat', '0766', 'P.O Box', 20, 20, this.selectedItems, this.dataSets, this.dataSets);
              } else {
                console.log(this.typeOfAction);
              }
              this.submitted = false;
            }
          });
        }
      });
    }
  }

  onSubmit(typeOfAction, accessingGroup) {
    if (typeOfAction === 'add') {
      console.log('access', accessingGroup);
      this.submitted = true;
      // get path of the parent
      this.httpClientService.get('organisationUnits/' + this.parent + '.json?fields=id,name,path')
        .subscribe((parentInfo) => {
          if (parentInfo) {
            // get UID for the unit
            this.httpClientService.get('system/id.json').subscribe((systemId) => {
              if (systemId) {
                if (accessingGroup.access.indexOf('C') >= 0) {
                  const orgLevelFour = helpers.createFacilityInfoObject(this.model, parentInfo, systemId['codes'][0])
                  console.log('org unit level for', orgLevelFour);
                  this.httpClientService.post('organisationUnits.json', orgLevelFour).subscribe((message) => {
                    if (message) {

                      this.UpdateOrganisationUnit('organisationUnits/' + systemId['codes'][0] + '/dataSets.json', this.model.dataSets);
                      console.log(JSON.stringify(message));
                      this.createMessage = message;
                      // this.router.navigate(['/dashboard/manage/' + this.parent]);
                    }
                  });
                } else {
                  // save to dataStore
                  // 1 get from data store
                  this.store.dispatch(new dataStore.LoadOrgUnitsFromDataStoreAction());
                  this.unConfirmedOrgUnitsFromdDataStore$ = this.store.pipe(select(getUnConfirmedOrgUnitsFromDataStore));
                  if (this.unConfirmedOrgUnitsFromdDataStore$) {
                    this.unConfirmedOrgUnitsFromdDataStore$.subscribe((orgUnits) => {
                      if (orgUnits) {
                        const unConfirmedOrgUnits = helpers.createFullInfoFacilityObject(orgUnits, systemId['codes'][0], parentInfo, this.model, typeOfAction, this.userInformation)
                        console.log(unConfirmedOrgUnits);
                        this.httpClientService.put('dataStore/facilityRegister/unConfirmedOrganisationUnits.json', unConfirmedOrgUnits)
                          .subscribe((message) => {
                            console.log('message', JSON.stringify(message));
                          });
                      }
                    });
                  }
                }
              }
            });
          }
        });
    }
  }

  UpdateOrganisationUnit(url, data) {
    const dataToUpdate = {
      'identifiableObjects': []
    };
    data.forEach((dataObj) => {
      const obj = {
        'id': dataObj.id
      };
      dataToUpdate.identifiableObjects.push(obj);
      console.log('dataToUpdate', JSON.stringify(dataToUpdate));
    });
    this.httpClientService.post(url, dataToUpdate).subscribe((message) => {
      console.log('put message', message);
    });
  }

  toggleListOfItems(selectedItemId, e) {
    // add this to list of selected
    if (e === 'un-select') {
      console.log('un-select');
      this.unSelectItem(selectedItemId);
    } else {
      this.addSelectedItems(selectedItemId);
    }
  }

  addSelectedItems(selectedItemId) {
    const newAvailableItems = this.availableDataSets;
    this.availableDataSets = [];
    newAvailableItems.forEach((item) => {
      if (item.id === selectedItemId) {
        this.selectedItems.push(item);
      } else {
        this.availableDataSets.push(item);
      }
    });
  }

  unSelectItem(itemId) {
    const newSelectedItems = this.selectedItems;
    this.selectedItems = [];
    newSelectedItems.forEach((item) => {
      if (item.id === itemId) {
        this.availableDataSets.push(item);
      } else {
        this.selectedItems.push(item);
      }
    });
  }
}

