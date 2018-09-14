import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { BookmarksPageComponent } from './bookmarks-page';
import { BookmarksRoutingModule } from './bookmarks-page.routing';
import { BookmarkFilterDialogComponent } from './bookmark-filter-dialog/bookmark-filter-dialog.component';
import { BookmarkCardComponent } from './bookmark-card/bookmark-card.component';
import { BookmarkGridComponent } from './bookmark-grid/bookmark-grid.component';

export const COMPONENTS = [
  BookmarksPageComponent,
  BookmarkFilterDialogComponent,
  BookmarkCardComponent,
  BookmarkGridComponent
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
