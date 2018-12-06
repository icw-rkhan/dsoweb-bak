import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { authRoutes } from './containers/auth/auth.routing';

export const ROUTES: Routes = [
  ...authRoutes,
  {
    path: '',
    redirectTo: '/auth/welcome',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/profile'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
