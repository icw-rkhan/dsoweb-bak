import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FeedPageComponent } from './feed-page';
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
        component: PostTypePageComponent,
      },
      {
        path: 'post-type/:id',
        component: PostTypePageComponent,
      },
      {
        path: 'latest',
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
