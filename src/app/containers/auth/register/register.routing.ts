import { Routes } from '@angular/router';

export const registerRoutes: Routes = [
  {
    path: 'register',
    loadChildren: 'src/app/containers/auth/register/register.module#RegisterModule'
  }
];
