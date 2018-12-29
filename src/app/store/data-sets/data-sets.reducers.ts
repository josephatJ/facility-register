import {DataSetsState} from './data-sets.state';
import {DataSetsAction, DataSetsActions} from './data-sets.actions';


export function dataSetsReducer(state: DataSetsState = null, action: DataSetsAction) {
  switch (action.type) {
    case DataSetsActions.LOAD_DATA_SETS_SUCCESS:
      return {...action.payload}
    default:
      return state;
  }
}
