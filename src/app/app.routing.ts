import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { authRoutes } from './containers/auth/auth.routing';
import { featuresRoutes } from './containers/features/features.routing';

export const ROUTES: Routes = [
  ...authRoutes,
  ...featuresRoutes,
  {
    path: '',
    redirectTo: '/auth/welcome',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
