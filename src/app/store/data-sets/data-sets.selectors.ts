import {AppState} from '../app.reducers';
import {createSelector} from '@ngrx/store';
import {DataSetsState} from './data-sets.state';


const dataSets = (state: AppState) => state.dataSets;

export const getDataSets = createSelector(dataSets, (dataSetsObj: DataSetsState) => dataSetsObj);
