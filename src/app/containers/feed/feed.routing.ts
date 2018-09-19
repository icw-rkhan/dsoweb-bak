import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FeedPageComponent } from './feed-page';
import { LatestPageComponent } from './latest-page/latest-page';
import { AuthGuard } from '../../services/auth/auth-guard';
import { PostTypePageComponent } from './post-type-page/post-type-page';

export const ROUTES: Routes = [
  {
    path: 'feed',
    canActivate: [AuthGuard],
    component: FeedPageComponent,
    children: [
      {
        path: 'latest',
        component: LatestPageComponent,
      },
      {
        path: 'post-type/:id',
        component: PostTypePageComponent,
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class FeedRoutingModule {
}
