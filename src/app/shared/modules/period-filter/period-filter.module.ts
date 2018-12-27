import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodFilterComponent } from './period-filter.component';
import {FormsModule} from '@angular/forms';
import {PeriodService} from './period.service';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
  ],
  declarations: [PeriodFilterComponent],
  exports: [PeriodFilterComponent],
  providers: [PeriodService]
})
export class PeriodFilterModule { }
