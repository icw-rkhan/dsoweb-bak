import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../../services/auth/auth-guard';
import { CareerReviewComponent } from './career-review.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewAddComponent } from './review-add/review-add.component';
import { ReviewViewComponent } from './review-view/review-view.component';

export const ROUTES: Routes = [
  {
      path: 'career/review',
      canActivate: [AuthGuard],
      component: CareerReviewComponent,
      children: [
          {
              path: '',
              component: ReviewListComponent,
          },
          {
              path: 'add/:id',
              component: ReviewAddComponent,
          },
          {
              path: 'view',
              component: ReviewViewComponent,
          }
      ]
  },
];

@NgModule({
  imports: [
      RouterModule.forChild(ROUTES)
  ]
})

export class CareerReviewRoutingModule { }
