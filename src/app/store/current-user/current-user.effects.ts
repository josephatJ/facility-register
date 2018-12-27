import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {HttpClientService} from '../../services/http-client.service';
import * as currentUser from './current-user.actions';

import {Observable, of, forkJoin} from 'rxjs';
import {CurrentUserState} from './current-user.state';

import {catchError, map, switchMap} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class CurrentUserEffects {

  @Effect()
  loadCurrentUser$ = this.actions$
    .ofType<currentUser.LoadCurrentUserAction>(currentUser.CurrentUserActions.LOAD_CURRENT_USER)
    .pipe(
      switchMap(() => this._load().pipe(
        map((currentUserObject: CurrentUserState) =>
          new currentUser.LoadCurrentUserSuccessAction(currentUserObject)),
        catchError((error) => of(new currentUser.LoadCurrentUserFailAction(error)))
      ))
    );

    @Effect()
    loadIdentifiableObject$ = this.actions$
    .ofType<currentUser.LoadIdentifiableObjectAction>(currentUser.CurrentUserActions.LOAD_IDENTIFIABLE_OBJECT)
    .pipe(
        switchMap((action: any) => this._loadIdentifiableObject(action.payload)
        .pipe(map((obj) => new currentUser.LoadIdentifiableObjectSuccessAction(obj)),
        catchError( (error) => of (new currentUser.LoadIdentifiableObjectFailAction(error)))
        ))
    )

  constructor(private actions$: Actions,
              private httpClient: HttpClientService) {
  }

  private _load(): Observable<any> {
    return this.httpClient.get(`me.json?fields=id,name,displayName,created,lastUpdated,email,
    dataViewOrganisationUnits[id,name,level],userCredentials[username],userGroups`);
  }

  private _loadIdentifiableObject(objects) {
    return new Observable(observer => {
        forkJoin(
            _.map(objects, (object) => 
            this.httpClient.get('identifiableObjects/' + object.id + '.json?fields=id,name'))
        ).subscribe((identifiableObject) => {
            observer.next(
                _.map(identifiableObject,
                    (loadedObject: any, loadedObjectIndex: number) =>
                    {
                        return {loadedObjectIndex, ...loadedObject}
                    }
                    )
            )
        })
    });
  }
}