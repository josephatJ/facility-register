import {OrganisationUnitFromStoreState, UserAccessState} from './dhis2-data-store.state';
import {Dhis2DataStoreAction, Dhis2DataStoreActions} from './dhis2-data-store.actions';


export function userAccessReducer(state: UserAccessState = null, action: Dhis2DataStoreAction) {
  switch (action.type) {
    case Dhis2DataStoreActions.LOAD_USER_ACCESS_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}

export function organisationUnitsFromDataStoreReducer(state: OrganisationUnitFromStoreState = null, action: Dhis2DataStoreAction) {
  switch (action.type) {
    case Dhis2DataStoreActions.LOAD_ORG_UNITS_INFO_FROM_DATA_STORE_SUCCESS:
      return {...action.payload}
    default:
      return state;
  }
}
