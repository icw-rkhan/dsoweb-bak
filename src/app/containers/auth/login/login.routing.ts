import { Routes } from '@angular/router';

export const loginRoutes: Routes = [
  {
    path: 'login',
    loadChildren: 'src/app/containers/auth/login/login.module#LoginModule'
  }
];
