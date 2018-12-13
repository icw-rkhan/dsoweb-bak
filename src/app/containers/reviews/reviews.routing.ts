import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReviewsComponent } from './reviews.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { AuthGuard } from '../../services/auth/auth-guard';

export const ROUTES: Routes = [
  {
    path: 'review',
    canActivate: [AuthGuard],
    component: ReviewsComponent,
    children: [
      {
        path: 'add/:id/:title/:date',
        component: AddComponent,
      },
      {
        path: 'view/:id',
        component: ViewComponent,
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class ReviewsRoutingModule {}
