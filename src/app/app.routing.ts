import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { reviewsRoutes } from './containers/reviews/reviews.routing';

export const ROUTES: Routes = [
  ...reviewsRoutes,
  {
    path: '',
    redirectTo: '/reviews/add',
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
