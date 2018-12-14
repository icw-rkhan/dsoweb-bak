import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CareerReviewRoutingModule } from './career-review.routing';
import { ReviewAddComponent } from './review-add/review-add.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewViewComponent } from './review-view/review-view.component';
import { CareerReviewComponent } from './career-review.component';
import { SharedModule } from '../../../shared';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    CareerReviewRoutingModule
  ],
  declarations: [
    CareerReviewComponent,
    ReviewAddComponent,
    ReviewListComponent,
    ReviewViewComponent
  ]
})
export class CareerReviewModule { }
