import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReviewsComponent } from './reviews.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';

export const ROUTES: Routes = [
    {
      path: 'reviews',
      component: ReviewsComponent,
      children: [
        {
          path: 'add',
          component: AddComponent,
        },
        {
          path: 'view',
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
  export class ReviewsRoutingModule {
  }