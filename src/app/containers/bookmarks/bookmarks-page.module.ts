import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { BookmarksPageComponent } from './bookmarks-page';
import { BookmarksRoutingModule } from './bookmarks-page.routing';
import { BookmarkFilterDialogComponent } from './bookmark-filter-dialog/bookmark-filter-dialog.component';

export const COMPONENTS = [
  BookmarksPageComponent,
  BookmarkFilterDialogComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BookmarksRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  entryComponents: [
    BookmarkFilterDialogComponent
  ]
})
export class BookmarksPageModule {
}
