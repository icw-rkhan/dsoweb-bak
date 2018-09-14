import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../../models/bookmark.model';
import { map } from 'rxjs/internal/operators';
import { BookmarkService } from '../../services/bookmark.service';
import { Observable } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BookmarkFilterDialogComponent } from './bookmark-filter-dialog/bookmark-filter-dialog.component';

@Component({
  templateUrl: './bookmarks-page.html',
  styleUrls: ['./bookmarks-page.scss']
})
export class BookmarksPageComponent implements OnInit {

  private bookmarks$: Observable<Bookmark[]>;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private bookmarkService: BookmarkService) {
  }

  ngOnInit(): void {
    this.bookmarks$ = this.bookmarkService.getAllByEmail('h1078660929@163.com');
  }

  openFilter(): void {
    const dialogRef = this.dialog.open(BookmarkFilterDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  remove(bookmark: Bookmark): void {
    this.bookmarkService.deleteOneById(bookmark.id).subscribe(() => {
      this.bookmarks$ = this.bookmarks$.pipe(
        map(items =>
          items.filter(b => b.id !== bookmark.id)
        ));
      this.snackBar.open('Bookmark removed', 'OK', {
        duration: 2000,
      });
    });
  }

}
