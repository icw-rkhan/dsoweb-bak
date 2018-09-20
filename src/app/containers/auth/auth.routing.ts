import { Routes } from '@angular/router';

import { AuthGuard } from '../../services/auth/auth-guard';

export const authRoutes: Routes = [
  {
    path: 'auth',
    // TODO: Auth is in a infinite cicle
    // canActivate: [AuthGuard],
    loadChildren: 'src/app/containers/auth/auth.module#AuthModule'
  }
];
