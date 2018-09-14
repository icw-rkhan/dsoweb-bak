import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: 'src/app/containers/auth/auth.module#AuthModule'
  }
];
