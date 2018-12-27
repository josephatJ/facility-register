import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUserState, IdentifibleObjectState } from 'src/app/store/current-user/current-user.state';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as currentUser from '../../store/current-user/current-user.actions';
import * as orgUnits from '../../store/organisation-units/organisation-units.actions';
import { getCurrentUser, getIdentifiableObjects } from 'src/app/store/current-user/current-user.selectors';
import { OrganisationUnitGroupSetsState } from 'src/app/store/organisation-units/organisation-units.state';
import { getOrganisationUnitGroupSets } from 'src/app/store/organisation-units/organisation-units.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser$: Observable<CurrentUserState>;
  identifiableObjects$: Observable<IdentifibleObjectState>;
  organisationUnitGroupSets$: Observable<OrganisationUnitGroupSetsState>;
  organisationGroupSets: any;
  levelFourOrgUnits: any;
  constructor(private store: Store<AppState>) {
    store.dispatch(new currentUser.LoadCurrentUserAction());
    store.dispatch( new orgUnits.LoadOrganisationUnitGroupSetsAction);
    this.currentUser$ = store.pipe(select(getCurrentUser));
    this.organisationUnitGroupSets$ = store.pipe(select(getOrganisationUnitGroupSets));
   }

  ngOnInit() {
    if (this.currentUser$) {
      this.currentUser$.subscribe((currentUserInfo) => {
      if (currentUserInfo) {
        this.store.dispatch(new currentUser.LoadIdentifiableObjectAction(currentUserInfo.userGroups));
        this.identifiableObjects$ = this.store.pipe(select(getIdentifiableObjects));
        if (this.identifiableObjects$) {
          this.identifiableObjects$.subscribe((identifiableObj) => {
            // if (identifiableObj) {
            //   console.log(identifiableObj);
            // }
          })
        }
      }  
      })
    }

    if (this.organisationUnitGroupSets$) {
      this.organisationUnitGroupSets$.subscribe((orgGroupSets) => {
        if (orgGroupSets) {
          this.organisationGroupSets = orgGroupSets[0]['organisationUnitGroupSets'];
          this.levelFourOrgUnits = orgGroupSets[1];
        }
      })
    }
  }

}
