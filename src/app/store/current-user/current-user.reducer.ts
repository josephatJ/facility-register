import { CurrentUserState, IdentifibleObjectState } from "./current-user.state";
import { CurrentUserAction, CurrentUserActions } from "./current-user.actions";

export function currentUserReducer (state: CurrentUserState = null, action: CurrentUserAction) {
    switch(action.type) {
        case CurrentUserActions.LOAD_CURRENT_USER_SUCCESS:
            return {...action.payload};
        default:
            return state;
    }
}

export function identifiableObjectReducer (state: IdentifibleObjectState = null, action: CurrentUserAction) {
    switch(action.type) {
        case CurrentUserActions.LOAD_IDENTIFIABLE_OBJECT_SUCCESS:
            return {...action.payload}
        default:
            return state;
    }
}
