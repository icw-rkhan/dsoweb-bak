import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';
import { AuthComponent } from './auth.component';

import { loginRoutes } from './login/login.routing';
import { welcomeRoutes } from './welcome/welcome.routing';
import { registerRoutes } from './register/register.routing';
import { forgotPasswordRoutes } from './forgot-password/forgot-password.routing';
import { resetPasswordRoutes } from './reset-password/reset-password.routing';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      ...welcomeRoutes,
      ...loginRoutes,
      ...registerRoutes,
      ...forgotPasswordRoutes,
      ...resetPasswordRoutes
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AuthComponent
  ],
})
export class AuthModule { }
