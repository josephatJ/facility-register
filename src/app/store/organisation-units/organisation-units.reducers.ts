import { OrganisationUnitsAction, OrganisationUnitsActions } from "./organisation-units.actions";
import {OrganisationUnitGroupSetsState, OrganisationUnitsState} from './organisation-units.state';


export function organisationUnitGroupSetsReducer(state: OrganisationUnitGroupSetsState = null, action: OrganisationUnitsAction) {
    switch (action.type) {
        case OrganisationUnitsActions.LOAD_ORG_UNITS_GROUP_SETS_SUCCESS:
            return {...action.payload};
        default:
            return state;
    }
}

export function organisationUnitsReducer(state: OrganisationUnitsState = null, action: OrganisationUnitsAction) {
  switch (action.type) {
    case OrganisationUnitsActions.LOAD_ORGANISATION_UNIT_SUCCESS:
      return {...action.payload};
    default:
      return state;
  }
}
