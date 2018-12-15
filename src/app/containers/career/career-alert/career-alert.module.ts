import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared';
import { CareerAlertRoutingModule } from './career-alert.routing';
import { CareerAlertComponent } from './career-alert.component';
import { AlertListComponent } from './alert-list/alert-list.component';
import { AlertAddComponent } from './alert-add/alert-add.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    CareerAlertRoutingModule
  ],
  declarations: [
    CareerAlertComponent,
    AlertListComponent,
    AlertAddComponent
  ]
})
export class CareerAlertModule { }
