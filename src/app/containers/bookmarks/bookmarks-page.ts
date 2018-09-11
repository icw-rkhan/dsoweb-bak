import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { BookmarkFilterDialogComponent } from './bookmark-filter-dialog/bookmark-filter-dialog.component';

@Component({
  templateUrl: './bookmarks-page.html',
  styleUrls: ['./bookmarks-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarksPageComponent implements OnInit {

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
