import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BookmarksPageComponent } from './bookmarks-page';
import {AuthGuard} from '../../services/auth/auth-guard';

export const ROUTES: Routes = [
  {
    path: 'bookmarks',
    canActivate: [AuthGuard],
    component: BookmarksPageComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class BookmarksRoutingModule {
}
