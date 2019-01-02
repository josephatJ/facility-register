import {Action} from '@ngrx/store';
import {OrganisationUnitFromStoreState, UserAccessState} from './dhis2-data-store.state';


export enum Dhis2DataStoreActions {
  LOAD_USER_ACCESS = '[User access] Load user access',
  LOAD_USER_ACCESS_SUCCESS = '[User access] Load user access success',
  LOAD_USER_ACCESS_FAIL = '[User access] Load user access fail',
  LOAD_ORG_UNITS_INFO_FROM_DATA_STORE = '[Org units from data store] Load org units not saved from data store',
  LOAD_ORG_UNITS_INFO_FROM_DATA_STORE_SUCCESS = '[Org units from data store] Load org units not saved from data store success',
  LOAD_ORG_UNITS_INFO_FROM_DATA_STORE_FAIL = '[Org units from data store] Load org units not saved from data store fail',
}

export class LoadUserAccessAction implements Action {
  readonly type = Dhis2DataStoreActions.LOAD_USER_ACCESS;
}


export class LoadUserAccessSuccessAction implements Action {
  readonly type = Dhis2DataStoreActions.LOAD_USER_ACCESS_SUCCESS;

  constructor(public payload: UserAccessState) {}
}

export class LoadUserAccessFailAction implements Action {
  readonly type = Dhis2DataStoreActions.LOAD_USER_ACCESS_FAIL;

  constructor(public payload: any) {}
}

export class LoadOrgUnitsFromDataStoreAction implements Action {
  readonly type = Dhis2DataStoreActions.LOAD_ORG_UNITS_INFO_FROM_DATA_STORE;
}

export class LoadOrgUnitsFromDataStoreSuccessAction implements Action {
  readonly type = Dhis2DataStoreActions.LOAD_ORG_UNITS_INFO_FROM_DATA_STORE_SUCCESS;

  constructor(public payload: OrganisationUnitFromStoreState) {}
}

export class LoadOrgUnitsFromDataStoreFailAction implements Action {
  readonly type = Dhis2DataStoreActions.LOAD_ORG_UNITS_INFO_FROM_DATA_STORE_FAIL;

  constructor(public payload: any) {}
}

export type Dhis2DataStoreAction = LoadUserAccessAction
  | LoadUserAccessSuccessAction
  | LoadUserAccessFailAction
  | LoadOrgUnitsFromDataStoreAction
  | LoadOrgUnitsFromDataStoreSuccessAction
  | LoadOrgUnitsFromDataStoreFailAction;
