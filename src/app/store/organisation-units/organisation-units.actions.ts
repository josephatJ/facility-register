import { Action } from "@ngrx/store";
import { OrganisationUnitGroupSetsState } from "./organisation-units.state";



export enum OrganisationUnitsActions {
    LOAD_ORG_UNITS_GROUP_SETS = '[OrganisationUnits group sets] load org unit groupsets',
    LOAD_ORG_UNITS_GROUP_SETS_SUCCESS = '[OrganisationUnits group sets] load org unit groupsets success',
    LOAD_ORG_UNITS_GROUP_SETS_FAIL = '[OrganisationUnits group sets] load org unit groupsets fail'
}


export class LoadOrganisationUnitGroupSetsAction implements Action {
    readonly type = OrganisationUnitsActions.LOAD_ORG_UNITS_GROUP_SETS;
}

export class LoadOrganisationUnitGroupSetsSuccessAction implements Action {
    readonly type = OrganisationUnitsActions.LOAD_ORG_UNITS_GROUP_SETS_SUCCESS;

    constructor(public payload: OrganisationUnitGroupSetsState) {}
}

export class LoadOrganisationUnitGroupSetsFailAction implements Action {
    readonly type = OrganisationUnitsActions.LOAD_ORG_UNITS_GROUP_SETS_FAIL;

    constructor(public payload: any) {}
}


export type OrganisationUnitsAction = LoadOrganisationUnitGroupSetsAction
| LoadOrganisationUnitGroupSetsSuccessAction
| LoadOrganisationUnitGroupSetsFailAction
