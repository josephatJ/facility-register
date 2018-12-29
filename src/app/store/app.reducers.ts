import {ActionReducerMap, MetaReducer, ActionReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';
import { currentUserReducer, identifiableObjectReducer } from './current-user/current-user.reducer';
import { CurrentUserState, IdentifibleObjectState } from './current-user/current-user.state';
import {organisationUnitGroupSetsReducer, organisationUnitsReducer} from './organisation-units/organisation-units.reducers';
import {OrganisationUnitGroupSetsState, OrganisationUnitsState} from './organisation-units/organisation-units.state';
import {DataSetsState} from './data-sets/data-sets.state';
import {dataSetsReducer} from './data-sets/data-sets.reducers';

export interface AppState {
  currentUser: CurrentUserState;
  identifiableObject: IdentifibleObjectState;
  organisationUnitGroupSets: OrganisationUnitGroupSetsState;
  organisationUnit: OrganisationUnitsState;
  dataSets: DataSetsState;
}

export const reducers: ActionReducerMap<AppState> = {
  currentUser: currentUserReducer,
  identifiableObject: identifiableObjectReducer,
  organisationUnitGroupSets: organisationUnitGroupSetsReducer,
  organisationUnit: organisationUnitsReducer,
  dataSets: dataSetsReducer
  };

  export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
