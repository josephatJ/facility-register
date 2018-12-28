import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ManageOrgUnitsComponent} from './pages/dashboard/components/manage-org-units/manage-org-units.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dashboard/:typeOfAction/:id',
    component: DashboardComponent
  },
  {
    path: 'dashboard-management/:typeOfAction/:id/:level',
    component: ManageOrgUnitsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
