import { Action } from "@ngrx/store";
import { CurrentUserState } from "./current-user.state";

export enum CurrentUserActions {
    LOAD_CURRENT_USER = '[Current user] Load current user',
    LOAD_CURRENT_USER_SUCCESS = '[Current user] Load current user success',
    LOAD_CURRENT_USER_FAIL = '[Current user] Load current user fail',
    LOAD_IDENTIFIABLE_OBJECT = '[Identifiable Object] Load identifiable object',
    LOAD_IDENTIFIABLE_OBJECT_SUCCESS = '[Identifiable Object] Load identifiable object success',
    LOAD_IDENTIFIABLE_OBJECT_FAIL = '[Identifiable Object] Load identifiable object fail',
}

export class LoadCurrentUserAction implements Action {
    readonly type = CurrentUserActions.LOAD_CURRENT_USER;
}

export class LoadCurrentUserSuccessAction implements Action {
    readonly type = CurrentUserActions.LOAD_CURRENT_USER_SUCCESS;

    constructor(public payload: CurrentUserState) {}
}

export class LoadCurrentUserFailAction implements Action {
    readonly type = CurrentUserActions.LOAD_CURRENT_USER_FAIL;

    constructor(public payload: any) {}
}

// Identifiable objects
export class LoadIdentifiableObjectAction implements Action {
    readonly type = CurrentUserActions.LOAD_IDENTIFIABLE_OBJECT;

    constructor(public payload: any) {}
}

export class LoadIdentifiableObjectSuccessAction implements Action {
    readonly type = CurrentUserActions.LOAD_IDENTIFIABLE_OBJECT_SUCCESS;

    constructor(public payload: any) {}
}

export class LoadIdentifiableObjectFailAction implements Action {
    readonly type = CurrentUserActions.LOAD_IDENTIFIABLE_OBJECT_FAIL;

    constructor(public payload: any) {}
}

export type CurrentUserAction = LoadCurrentUserAction 
| LoadCurrentUserSuccessAction 
| LoadCurrentUserFailAction 
| LoadIdentifiableObjectAction
| LoadIdentifiableObjectSuccessAction
| LoadIdentifiableObjectFailAction
