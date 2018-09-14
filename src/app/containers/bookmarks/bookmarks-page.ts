import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgxMasonryOptions } from 'ngx-masonry';

import { BookmarkFilterDialogComponent } from './bookmark-filter-dialog/bookmark-filter-dialog.component';

@Component({
  templateUrl: './bookmarks-page.html',
  styleUrls: ['./bookmarks-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksPageComponent implements OnInit {

  gridOptions: NgxMasonryOptions = {
    transitionDuration: '0.8s',
    percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: '.gutter-sizer',
    horizontalOrder: true
  };

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openFilter() {
    const dialogRef = this.dialog.open(BookmarkFilterDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
