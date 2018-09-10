import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { AddReviewComponent } from './containers/add-review/add-review.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/reviews/add',
    pathMatch: 'full'
  },
  {
    path: 'reviews/add',
    component: AddReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
