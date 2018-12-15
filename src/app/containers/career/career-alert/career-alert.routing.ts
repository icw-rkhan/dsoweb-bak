import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../../services/auth/auth-guard';
import { CareerAlertComponent } from './career-alert.component';
import { AlertListComponent } from './alert-list/alert-list.component';
import { AlertAddComponent } from './alert-add/alert-add.component';

export const ROUTES: Routes = [
  {
      path: 'career/alert',
      canActivate: [AuthGuard],
      component: CareerAlertComponent,
      children: [
        {
          path: '',
          component: AlertListComponent
        },
        {
          path: 'add',
          component: AlertAddComponent
        }
      ]
  },
];

@NgModule({
  imports: [
      RouterModule.forChild(ROUTES)
  ]
})

export class CareerAlertRoutingModule { }
