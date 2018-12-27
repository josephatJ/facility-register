import {createSelector} from '@ngrx/store';
import {AppState} from '../app.reducers';
import {CurrentUserState, IdentifibleObjectState} from './current-user.state';

const currentUser = (state: AppState) => state.currentUser;
const identifiableObject = (state: AppState) => state.identifiableObject;

export const getCurrentUser = createSelector(currentUser, (currentUserObject: CurrentUserState) => currentUserObject);

export const getIdentifiableObjects = createSelector(identifiableObject, (identifiableItem: IdentifibleObjectState) => identifiableItem)
