import {Action} from '@ngrx/store';
import {DataSetsState} from './data-sets.state';


export enum DataSetsActions {
  LOAD_DATA_SETS = '[Datasets] Load datasets',
  LOAD_DATA_SETS_SUCCESS = '[Datasets] Load datasets success',
  LOAD_DATA_SETS_FAIL = '[Datasets] Load datasets fail'
}

export class LoadDataSetsAction implements Action {
  readonly type = DataSetsActions.LOAD_DATA_SETS;
}

export class LoadDataSetsSuccessAction implements Action {
  readonly type = DataSetsActions.LOAD_DATA_SETS_SUCCESS;

  constructor(public payload: DataSetsState) {}
}

export class LoadDataSetsFailAction implements Action {
  readonly type = DataSetsActions.LOAD_DATA_SETS_FAIL;

  constructor(public payload: any) {}
}

export type DataSetsAction = LoadDataSetsAction
| LoadDataSetsSuccessAction
| LoadDataSetsFailAction;

