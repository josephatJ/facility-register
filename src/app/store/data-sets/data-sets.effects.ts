import {Actions, Effect} from '@ngrx/effects';
import {HttpClientService} from '../../services/http-client.service';
import {Injectable} from '@angular/core';
import * as dataSets from '../../store/data-sets/data-sets.actions';
import * as _ from 'lodash';
import {catchError, switchMap, map} from 'rxjs/operators';
import {DataSetsState} from './data-sets.state';
import {of} from 'rxjs';

@Injectable()
export class DataSetsEffects {
  @Effect()
  dataSets$ = this.actions$
    .ofType<dataSets.LoadDataSetsAction>(dataSets.DataSetsActions.LOAD_DATA_SETS)
    .pipe(
      switchMap( () => this.httpClient.get('dataSets.json?paging=false')
        .pipe(
          map( (dataSetsObj: DataSetsState) =>
            new dataSets.LoadDataSetsSuccessAction(dataSetsObj)
          ),
          catchError( (error) => of ( new dataSets.LoadDataSetsFailAction(error)))
        ))
    );


  constructor(private actions$: Actions,
              private httpClient: HttpClientService) {}
}
