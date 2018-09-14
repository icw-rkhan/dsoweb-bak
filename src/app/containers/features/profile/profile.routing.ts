import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: 'profile',
    loadChildren: 'src/app/containers/features/profile/profile.module#ProfileModule'
  }
];
