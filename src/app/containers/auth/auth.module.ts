import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';
import { AuthComponent } from './auth.component';

import { loginRoutes } from './login/login.routing';
import { welcomeRoutes } from './welcome/welcome.routing';
import { registerRoutes } from './register/register.routing';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      ...welcomeRoutes,
      ...loginRoutes,
      ...registerRoutes
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
