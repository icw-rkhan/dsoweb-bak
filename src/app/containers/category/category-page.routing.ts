import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CategoryPageComponent } from './category-page';
import {AuthGuard} from '../../services/auth/auth-guard';

export const ROUTES: Routes = [
  {
    path: 'category',
    canActivate: [AuthGuard],
    component: CategoryPageComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class CategoryRoutingModule {
}
