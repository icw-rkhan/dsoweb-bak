import { Routes } from '@angular/router';

export const resetPasswordRoutes: Routes = [
  {
    path: 'reset-password',
    loadChildren: 'src/app/containers/auth/reset-password/reset-password.module#ResetPasswordModule'
  }
];
