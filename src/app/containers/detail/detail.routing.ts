import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailComponent } from './detail.component';
import {AuthGuard} from '../../services/auth/auth-guard';
import { CommonComponent } from './common/common.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { RelativeComponent } from './relative/relative.component';

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
          path: 'sponsor/relative/:id/:y/:m/:d/:title',
          component: RelativeComponent,
        }
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
