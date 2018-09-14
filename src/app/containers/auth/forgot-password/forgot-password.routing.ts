import { Routes } from '@angular/router';

export const forgotPasswordRoutes: Routes = [
  {
    path: 'forgot-password',
    loadChildren: 'src/app/containers/auth/forgot-password/forgot-password.module#ForgotPasswordModule'
  }
];
