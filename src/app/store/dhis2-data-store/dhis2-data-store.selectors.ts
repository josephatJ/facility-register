import {AppState} from '../app.reducers';
import {createSelector} from '@ngrx/store';
import {OrganisationUnitFromStoreState, UserAccessState} from './dhis2-data-store.state';


export const userAccess = (state: AppState) => state.userAccess;

export const unConfirmedOrgUnits = (state: AppState) => state.unConfirmedOrgUnits;

export const getUserAccess = createSelector(userAccess, (userAccessObj: UserAccessState) => userAccessObj);

export const getUnConfirmedOrgUnitsFromDataStore = createSelector(unConfirmedOrgUnits, (unConfirmedOrgUnitsObj: OrganisationUnitFromStoreState) => unConfirmedOrgUnitsObj);
