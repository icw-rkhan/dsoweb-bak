import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DetailComponent } from './detail.component';
import { CommonComponent } from './common/common.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import {AuthGuard} from '../../services/auth/auth-guard';

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