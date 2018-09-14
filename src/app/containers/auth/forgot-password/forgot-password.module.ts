import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../../shared';
import { ForgotPasswordComponent } from './forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent
  },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ForgotPasswordComponent
  ],
})
export class ForgotPasswordModule { }
