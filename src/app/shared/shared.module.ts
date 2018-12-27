import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { components } from './components';
import { pipes } from './pipes';
import { directives } from './directives';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...components, ...pipes, ...directives],
  exports: [...components, ...pipes, ...directives]
})
export class SharedModule { }
