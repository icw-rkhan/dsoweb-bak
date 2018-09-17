import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SearchPageComponent } from './search-page';
import {AuthGuard} from '../../services/auth/auth-guard';

export const ROUTES: Routes = [
  {
    path: 'search',
    canActivate: [AuthGuard],
    component: SearchPageComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class SearchRoutingModule {
}
