import { Component, OnInit } from '@angular/core';

import { OrganisationUnit } from '../organisation-unit';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  model: any;
  submitted: boolean;
  dataSets: any;
  constructor() { }

  ngOnInit() {
    this.dataSets = ['L&D', 'ANC'];
    this.model = new OrganisationUnit('1WsUihtSytA', 'Facility XXXX', 'Facility XXXX', 'Facility XXXX', 'this is description', '20-12-2018', '20-12-2018', 'This is comment', 'Josephat', '0766', 'P.O Box', 20, 20, this.dataSets, this.dataSets, this.dataSets);

    this.submitted = false;
  }

  onSubmit() { this.submitted = true; console.log(this.model); }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
