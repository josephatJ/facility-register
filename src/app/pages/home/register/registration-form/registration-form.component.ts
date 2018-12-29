import {Component, Input, OnInit} from '@angular/core';

import { OrganisationUnitLevelFour } from '../organisation-unit';
import {HttpClientService} from '../../../../services/http-client.service';
import {Router} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import * as _ from 'lodash';
import {DataSetsState} from '../../../../store/data-sets/data-sets.state';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducers';
import * as dataSetsActions from '../../../../store/data-sets/data-sets.actions';
import {getDataSets} from '../../../../store/data-sets/data-sets.selectors';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  model: any;
  submitted: boolean;
  dataSets: any;
  createMessage: any;
  selectedItems = [];
  dataSets$: Observable<DataSetsState>;
  availableDataSets: any;
  @Input() level: number;
  @Input() parent: string;
  @Input() typeOfAction: string;
  constructor(private httpClientService: HttpClientService, private router: Router, private store: Store<AppState>) {
    store.dispatch(new dataSetsActions.LoadDataSetsAction());
    this.dataSets$ = store.pipe(select(getDataSets));
  }

  ngOnInit() {
    if (this.typeOfAction === 'add') {
      this.dataSets = ['L&D', 'ANC'];
      if (this.dataSets$) {
        this.dataSets$.subscribe((dataSets) => {
          if (dataSets) {
            this.availableDataSets = dataSets.dataSets;
          }
        });
      }
      this.model = new OrganisationUnitLevelFour('1WsUihtSytA', 'Facility XXXX', 'Facility XXXX', 'Facility XXXX', 'this is description', '20-12-2018', '20-12-2018', 'This is comment', 'Josephat', '0766', 'P.O Box', 20, 20, this.selectedItems, this.dataSets, this.dataSets);
    } else {
      console.log(this.typeOfAction);
    }
    this.submitted = false;
  }

  onSubmit(typeOfAction) {
    console.log('model', this.model);
    if (typeOfAction === 'add') {
      this.submitted = true;
      // get path of the parent
      this.httpClientService.get('organisationUnits/' + this.parent + '.json?fields=id,name,path')
        .subscribe((parentInfo) => {
          if (parentInfo) {
            // get UID for the unit
            this.httpClientService.get('system/id.json').subscribe((systemId) => {
              if (systemId) {
                const orgLevelFour = {
                  'code': this.model.code,
                  'name': this.model.name,
                  'id': systemId['codes'][0],
                  'shortName': this.model.shortName,
                  'path': parentInfo.path + '/' + systemId['codes'][0],
                  'featureType': 'NONE',
                  'openingDate': '1899-12-30T23:27:16.000',
                  'parent': {
                    'id': this.parent
                  },
                  'user': {
                    'id': 'ELelSS7HfqW'
                  },
                  'attributeValues': [],
                  'translations': []
                };
                this.httpClientService.post('organisationUnits.json', orgLevelFour).subscribe((message) => {
                  if (message) {

                    this.UpdateOrganisationUnit('organisationUnits/' + systemId['codes'][0] + '/dataSets.json', this.model.dataSets);
                    console.log(JSON.stringify(message));
                    this.createMessage = message;
                    // this.router.navigate(['/dashboard/manage/' + this.parent]);
                  }
                });
              }
            });
          }
        });
    }
  }

  UpdateOrganisationUnit(url, data) {
    const dataToUpdate = {
      'identifiableObjects': []
    };
    data.forEach((dataObj) => {
      const obj = {
        'id': dataObj.id
      };
      dataToUpdate.identifiableObjects.push(obj);
      console.log('dataToUpdate', JSON.stringify(dataToUpdate));
    });
    this.httpClientService.post(url, dataToUpdate).subscribe((message) => {
      console.log('put message', message);
    });
  }

  toggleListOfItems(selectedItemId, e) {
    // add this to list of selected
    if (e === 'un-select') {
      console.log('un-select');
      this.unSelectItem(selectedItemId);
    } else {
      this.addSelectedItems(selectedItemId);
    }
  }

  addSelectedItems(selectedItemId) {
    const newAvailableItems = this.availableDataSets;
    this.availableDataSets = [];
    newAvailableItems.forEach((item) => {
      if (item.id === selectedItemId) {
        this.selectedItems.push(item);
      } else {
        this.availableDataSets.push(item);
      }
    });
  }

  unSelectItem(itemId) {
    const newSelectedItems = this.selectedItems;
    this.selectedItems = [];
    newSelectedItems.forEach((item) => {
      if (item.id === itemId) {
        this.availableDataSets.push(item);
      } else {
        this.selectedItems.push(item);
      }
    });
  }
}
