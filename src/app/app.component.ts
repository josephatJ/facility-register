import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.reducers';
import * as currentUser from './store/current-user/current-user.actions';
import * as dataStore from './store/dhis2-data-store/dhis2-data-store.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'facility register';

  constructor(private store: Store<AppState>) {
    store.dispatch(new currentUser.LoadCurrentUserAction());
    store.dispatch(new dataStore.LoadUserAccessAction());
  }
}
