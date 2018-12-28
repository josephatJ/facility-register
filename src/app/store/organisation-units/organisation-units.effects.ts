import { Actions, Effect } from "@ngrx/effects";
import { HttpClientService } from "src/app/services/http-client.service";
import { Injectable } from "@angular/core";
import * as orgUnits from '../organisation-units/organisation-units.actions'
import { switchMap, catchError, map } from "rxjs/operators";
import {OrganisationUnitGroupSetsState, OrganisationUnitsState} from './organisation-units.state';
import { of, Observable, forkJoin } from "rxjs";
import * as _ from 'lodash';


@Injectable()
export class OrganisationUnitsEffects {

    @Effect()
    loadOrgUnitsGroupSets$ = this.actions$
    .ofType<orgUnits.LoadOrganisationUnitGroupSetsAction>(orgUnits.OrganisationUnitsActions.LOAD_ORG_UNITS_GROUP_SETS)
    .pipe(
        switchMap(() =>
        this._orgUnitGroupSetsInfo(['organisationUnitGroupSets.json?paging=false&fields=id,name,organisationUnitGroups[id,name,organisationUnits~size]', 'organisationUnits.json?level=4&fields=*']).pipe(
            map((orgGroupSets: OrganisationUnitGroupSetsState) =>
            new orgUnits.LoadOrganisationUnitGroupSetsSuccessAction(orgGroupSets)),
            catchError((error) => of (new orgUnits.LoadOrganisationUnitGroupSetsFailAction(error)))
            ))
    );

    @Effect()
    organisationUnit$ = this.actions$
      .ofType<orgUnits.LoadOrganisationUnitsAction>(orgUnits.OrganisationUnitsActions.LOAD_ORGANISATION_UNIT)
      .pipe(
        switchMap( (action: any) => this._getOrganisationUnit(action.payload)
          .pipe(
            map( (organisationUnit: OrganisationUnitsState) =>
            new orgUnits.LoadOrganisationUnitsSuccessAction(organisationUnit)),
            catchError( (error) => of (new orgUnits.LoadOrganisationUnitsFailAction(error)))
          ))
      );

    constructor(private actions$: Actions,
        private httpClient: HttpClientService) {
}

private _orgUnitGroupSetsInfo(urls) {
    return new Observable(observer => {
        forkJoin(
            _.map(urls, (url) =>
            this.httpClient.get(url)
            )
        ).subscribe((returnedData) => {
            observer.next(
              _.map(returnedData,
                  (returnedObject: any, returnedObjectIndex: number) => {
                      return {returnedObjectIndex, ...returnedObject};
                  }
                  )
            );
        });
    });
}

private  _getOrganisationUnit(id): Observable<any> {
      const url = 'organisationUnits/' + id + '.json?fields=id,name,level,children[id,name,level]';
      console.log(url);
      return this.httpClient.get(url);
}
}
