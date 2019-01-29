import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailComponent } from './detail.component';
import {AuthGuard} from '../../services/auth/auth-guard';
import { CommonComponent } from './common/common.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { RelativeComponent } from './relative/relative.component';
import { FeedsByAuthorComponent } from './feeds-by-author/feeds-by-author.component';

export const ROUTES: Routes = [
    {
      path: 'detail',
      canActivate: [AuthGuard],
      component: DetailComponent,
      children: [
        {
          path: ':id',
          component: CommonComponent,
        },
        {
          path: 'sponsor/:id',
          component: SponsorComponent,
        },
        {
          path: 'sponsor/:id/:y/:m/:d/:title',
          component: RelativeComponent,
        },
        {
          path: 'author/:id',
          component: FeedsByAuthorComponent,
        },
      ]
    },
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(ROUTES)
    ]
  })
  export class DetailRoutingModule {
  }
