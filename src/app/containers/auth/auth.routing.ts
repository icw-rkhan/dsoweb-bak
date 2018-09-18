import { Routes } from '@angular/router';

import { AuthGuard } from '../../services/auth/auth-guard';

export const authRoutes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: 'src/app/containers/auth/auth.module#AuthModule'
  }
];
