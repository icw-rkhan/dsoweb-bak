import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ResetPasswordComponent
  ],
})
export class ResetPasswordModule { }
