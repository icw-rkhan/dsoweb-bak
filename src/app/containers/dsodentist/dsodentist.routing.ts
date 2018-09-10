import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { DsodentistPageComponent } from './dsodentist';

export const ROUTES: Routes = [
  {
    path: 'dsodentist',
    component: DsodentistPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class DsodentistRoutingModule {
}
