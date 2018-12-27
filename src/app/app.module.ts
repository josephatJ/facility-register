import { BrowserModule } from '@angular/platform-browser';
import {Directive, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { effects } from './store/app.effects';
import { metaReducers, reducers } from './store/app.reducers';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {ManifestService} from './services/manifest.service';
import {HttpClientService} from './services/http-client.service';
import {HomeComponent} from './pages/home/home.component';
import {NgxDhis2MenuModule} from '@hisptz/ngx-dhis2-menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GeneralStatsComponent } from './pages/home/general-stats/general-stats.component';
import { RegisterComponent } from './pages/home/register/register.component';
import {HighchartsChartModule} from 'highcharts-angular';
import { ChartComponent } from './pages/home/chart/chart.component';
import { SliderComponent } from './pages/home/slider/slider.component';
import { TableComponent } from './pages/home/table/table.component';
import { RegistrationFormComponent } from './pages/home/register/registration-form/registration-form.component';
import {FormsModule} from '@angular/forms';
import {sharedModules} from './shared';
import { OrgUnitsListComponent } from './pages/home/register/org-units-list/org-units-list.component';
import {PagerService} from './services/pager.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GeneralStatsComponent,
    RegisterComponent,
    ChartComponent,
    SliderComponent,
    TableComponent,
    RegistrationFormComponent,
    OrgUnitsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ...sharedModules,
    NgxDhis2MenuModule,
    HighchartsChartModule,
     /**
     * Reducers
     */
    StoreModule.forRoot(reducers, {metaReducers}),

    /**
     * Effects
     */
    EffectsModule.forRoot(effects),

    /**
     * Dev tool, enabled only in development mode
     */
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [ManifestService, HttpClientService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
