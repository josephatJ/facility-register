import {ActionReducerMap, MetaReducer, ActionReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';
import { currentUserReducer, identifiableObjectReducer } from './current-user/current-user.reducer';
import { CurrentUserState, IdentifibleObjectState } from './current-user/current-user.state';
import {organisationUnitGroupSetsReducer, organisationUnitsReducer} from './organisation-units/organisation-units.reducers';
import {OrganisationUnitGroupSetsState, OrganisationUnitsState} from './organisation-units/organisation-units.state';

export interface AppState {
  currentUser: CurrentUserState;
  identifiableObject: IdentifibleObjectState;
  organisationUnitGroupSets: OrganisationUnitGroupSetsState;
  organisationUnit: OrganisationUnitsState;
}

export const reducers: ActionReducerMap<AppState> = {
  currentUser: currentUserReducer,
  identifiableObject: identifiableObjectReducer,
  organisationUnitGroupSets: organisationUnitGroupSetsReducer,
  organisationUnit: organisationUnitsReducer
  };

  export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
