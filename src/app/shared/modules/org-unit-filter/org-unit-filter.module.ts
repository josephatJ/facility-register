import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrgUnitFilterComponent} from './org-unit-filter.component';
import {OrgUnitService} from './org-unit.service';
import {MultiselectComponent} from './multiselect/multiselect.component';
import {ClickOutsideDirective} from './directives/click-outside.directive';
import {FilterLevelPipe} from './pipes/filter-level.pipe';
import {TreeModule} from 'angular-tree-component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    TranslateModule,
  ],
  declarations: [
    OrgUnitFilterComponent,
    MultiselectComponent,
    ClickOutsideDirective,
    FilterLevelPipe
  ],
  exports: [OrgUnitFilterComponent],
  providers: [OrgUnitService]
})
export class OrgUnitFilterModule { }
