import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { reviewsRoutes } from './containers/reviews/reviews.routing';
import { downloadsRoutes } from './containers/downloads/downloads.routing'
 
export const ROUTES: Routes = [
  ...reviewsRoutes,
  ...downloadsRoutes,
  {
    path: '',
    redirectTo: '/downloads/download',
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
