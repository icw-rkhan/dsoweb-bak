import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BookmarksPageComponent } from './bookmarks-page';

export const ROUTES: Routes = [
  {
    path: 'bookmarks',
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
