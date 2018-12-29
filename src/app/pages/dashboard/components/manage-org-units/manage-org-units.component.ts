import {ChangeDetectorRef, Component, OnInit, OnChanges, Input} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AppState} from '../../../../store/app.reducers';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {OrganisationUnitGroupSetsState, OrganisationUnitsState} from '../../../../store/organisation-units/organisation-units.state';
import * as orgUnits from '../../../../store/organisation-units/organisation-units.actions';
import {getOrganisationUnitByID, getOrganisationUnitGroupSets} from '../../../../store/organisation-units/organisation-units.selectors';
import {HttpClientService} from '../../../../services/http-client.service';

@Component({
  selector: 'app-manage-org-units',
  templateUrl: './manage-org-units.component.html',
  styleUrls: ['./manage-org-units.component.css']
})
export class ManageOrgUnitsComponent implements OnInit {

  organisationUnit$: Observable<OrganisationUnitsState>;
  organisationUnitGroupSets$: Observable<OrganisationUnitGroupSetsState>;
  selectedOrgUnitId: string;
  typeOfAction: string;
  level: string;
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private httpClient: HttpClientService) {
    this.organisationUnitGroupSets$ = store.pipe(select(getOrganisationUnitGroupSets));
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id']) {
        this.typeOfAction = params['typeOfAction'];
        this.level = params['level'];
        this.selectedOrgUnitId = params['id'];
        this.store.dispatch(new orgUnits.LoadOrganisationUnitsAction(this.selectedOrgUnitId));
        this.organisationUnit$ = this.store.pipe(select(getOrganisationUnitByID));
      }

      if (this.organisationUnitGroupSets$) {
        this.organisationUnitGroupSets$.subscribe((groupSets) => {
          if (groupSets) {
            console.log(groupSets);
          }
        });
      }
    });
  }
}
