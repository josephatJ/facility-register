import { Actions, Effect } from "@ngrx/effects";
import { HttpClientService } from "src/app/services/http-client.service";
import { Injectable } from "@angular/core";
import * as orgUnits from '../organisation-units/organisation-units.actions'
import { switchMap, catchError, map } from "rxjs/operators";
import { OrganisationUnitGroupSetsState } from "./organisation-units.state";
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

    constructor(private actions$: Actions,
        private httpClient: HttpClientService) {
}

private _orgUnitGroupSetsInfo(urls) {
    return new Observable(observer => {
        forkJoin(
            _.map(urls, (url) =>
            this.httpClient.get(url)
            )
        ).subscribe((returnedObject) =>{
            observer.next(
                _.map(returnedObject,
                    (returnedObject: any, returnedObjectIndex: number) =>
                    {
                        return {returnedObjectIndex, ...returnedObject}
                    }
                    )
            )
        })
    })
}
}