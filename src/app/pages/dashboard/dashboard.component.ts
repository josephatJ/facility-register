import { Component, OnInit } from '@angular/core';
import {getCurrentUser, getIdentifiableObjects} from '../../store/current-user/current-user.selectors';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {CurrentUserState, IdentifibleObjectState} from '../../store/current-user/current-user.state';
import * as orgUnits from '../../store/organisation-units/organisation-units.actions';
import {OrganisationUnitGroupSetsState} from '../../store/organisation-units/organisation-units.state';
import {getOrganisationUnitGroupSets} from '../../store/organisation-units/organisation-units.selectors';
import * as currentUser from '../../store/current-user/current-user.actions';
import {AppState} from '../../store/app.reducers';
import {ActivatedRoute, Params} from '@angular/router';
import * as helpers from './helpers';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser$: Observable<CurrentUserState>;
  identifiableObjects$: Observable<IdentifibleObjectState>;
  organisationUnitGroupSets$: Observable<OrganisationUnitGroupSetsState>;
  organisationGroupSets: any;
  levelFourOrgUnits: any;
  selectedOrgUnitId: string;
  selectedOrgUnitDefinition: any = {
    starting_name: '',
    arrayed_org_units: [],
    items: {},
    name: 'ou',
    value: {},
    typeOfAction: 'stats'
  };
  menuLists: any = [
    {
      id: 'home',
      name: 'Home',
      typeOfAction: 'stats'
    },
    {
      id: 'manage',
      name: 'Manage',
      typeOfAction: 'manage'
    }
  ]
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    store.dispatch( new orgUnits.LoadOrganisationUnitGroupSetsAction);
    this.currentUser$ = store.pipe(select(getCurrentUser));
    this.organisationUnitGroupSets$ = store.pipe(select(getOrganisationUnitGroupSets));
  }

  ngOnInit() {
    if (this.currentUser$) {
      this.route.params.forEach((params: Params) => {
        this.selectedOrgUnitId = params['id'];
        this.selectedOrgUnitDefinition.typeOfAction = params['typeOfAction'];
        this.currentUser$.subscribe((currentUserInfo) => {
          if (currentUserInfo) {
            this.store.dispatch(new currentUser.LoadIdentifiableObjectAction(currentUserInfo.userGroups));
            this.identifiableObjects$ = this.store.pipe(select(getIdentifiableObjects));
            if (this.identifiableObjects$) {
              this.identifiableObjects$.subscribe((identifiableObj) => {
                // if (identifiableObj) {
                //   cupdateupdateonsole.log(identifiableObj);
                // }
              });
            }
          }
        });
      });
    }

    if (this.organisationUnitGroupSets$) {
      this.organisationUnitGroupSets$.subscribe((orgGroupSets) => {
        if (orgGroupSets) {
          this.organisationGroupSets = orgGroupSets[0]['organisationUnitGroupSets'];
          this.levelFourOrgUnits = orgGroupSets[1];
        }
      });
    }
  }

  getDataForChart(selectedOrganisationUnit, orgUnitGroup, levelFourOrgUnits) {
    return helpers.getGroupSetInfoForChart(selectedOrganisationUnit, orgUnitGroup, levelFourOrgUnits)
  }

  getSelectedOrgUnitDefinition(orgDefinition) {
    this.selectedOrgUnitDefinition = orgDefinition;
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
}

