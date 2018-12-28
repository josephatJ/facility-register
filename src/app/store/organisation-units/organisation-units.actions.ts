import { Action } from "@ngrx/store";
import {OrganisationUnitGroupSetsState, OrganisationUnitsState} from './organisation-units.state';



export enum OrganisationUnitsActions {
    LOAD_ORG_UNITS_GROUP_SETS = '[OrganisationUnits group sets] load org unit groupsets',
    LOAD_ORG_UNITS_GROUP_SETS_SUCCESS = '[OrganisationUnits group sets] load org unit groupsets success',
    LOAD_ORG_UNITS_GROUP_SETS_FAIL = '[OrganisationUnits group sets] load org unit groupsets fail',
    LOAD_ORGANISATION_UNIT = '[Organisation unit] Load organisation unit',
    LOAD_ORGANISATION_UNIT_SUCCESS = '[Organisation unit] Load organisation unit success',
    LOAD_ORGANISATION_UNIT_FAIL = '[Organisation unit] Load organisation unit fail',
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

export class LoadOrganisationUnitsAction implements Action {
  readonly type = OrganisationUnitsActions.LOAD_ORGANISATION_UNIT;

  constructor(public payload: string) {}
}

export class LoadOrganisationUnitsSuccessAction implements Action {
  readonly type = OrganisationUnitsActions.LOAD_ORGANISATION_UNIT_SUCCESS;

  constructor(public payload: OrganisationUnitsState) {}
}

export class LoadOrganisationUnitsFailAction implements Action {
  readonly type = OrganisationUnitsActions.LOAD_ORGANISATION_UNIT_FAIL;

  constructor(public payload: any) {}
}


export type OrganisationUnitsAction = LoadOrganisationUnitGroupSetsAction
| LoadOrganisationUnitGroupSetsSuccessAction
| LoadOrganisationUnitGroupSetsFailAction
| LoadOrganisationUnitsAction
| LoadOrganisationUnitsSuccessAction
| LoadOrganisationUnitsFailAction;
