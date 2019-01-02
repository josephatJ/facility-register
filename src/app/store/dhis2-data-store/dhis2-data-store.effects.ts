import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {HttpClientService} from '../../services/http-client.service';
import * as dataStore from '../../store/dhis2-data-store/dhis2-data-store.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {OrganisationUnitFromStoreState, UserAccessState} from './dhis2-data-store.state';
import {of} from 'rxjs';


@Injectable()
export class Dhis2DataStoreEffects {

  @Effect()
  userAccess$ = this.action$
    .ofType<dataStore.LoadUserAccessAction>(dataStore.Dhis2DataStoreActions.LOAD_USER_ACCESS)
    .pipe(
      switchMap( () => this.httpClientService.get('dataStore/facilityRegister/userAccess')
        .pipe(
          map( (userAccessObj: UserAccessState) => new dataStore.LoadUserAccessSuccessAction(userAccessObj)),
          catchError( (error) => of (new dataStore.LoadUserAccessFailAction(error)))
        ))
    );

  @Effect()
  loadOrganisationUnitsFromDataStore$ = this.action$
    .ofType<dataStore.LoadOrgUnitsFromDataStoreAction>(dataStore.Dhis2DataStoreActions.LOAD_ORG_UNITS_INFO_FROM_DATA_STORE)
    .pipe(
      switchMap( () => this.httpClientService.get('dataStore/facilityRegister/unConfirmedOrganisationUnits')
        .pipe(
          map( (orgObj: OrganisationUnitFromStoreState) => new dataStore.LoadOrgUnitsFromDataStoreSuccessAction(orgObj)),
          catchError( (error) => of (new dataStore.LoadOrgUnitsFromDataStoreFailAction(error)))
        ))
    );

  constructor(private action$: Actions, private httpClientService: HttpClientService) {}
}
