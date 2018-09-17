import { Component, OnDestroy, OnInit } from '@angular/core';
import { Bookmark } from '../../models/bookmark.model';
import { map } from 'rxjs/internal/operators';
import { BookmarkService } from '../../services/bookmark.service';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BookmarkFilterDialogComponent } from './bookmark-filter-dialog/bookmark-filter-dialog.component';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  templateUrl: './bookmarks-page.html',
  styleUrls: ['./bookmarks-page.scss']
})
export class BookmarksPageComponent implements OnInit, OnDestroy {

  bookmarks$: Observable<Bookmark[]>;

  private bookmarkSub: Subscription;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private bookmarkService: BookmarkService,
              private progress: NgProgress) {
  }

  ngOnInit(): void {
    this.progress.start();
    this.bookmarks$ = this.bookmarkService.getAllByEmail('h1078660929@163.com');
    this.bookmarkSub = this.bookmarks$.subscribe(() => this.progress.complete());
  }

  openFilter(): void {
    const dialogRef = this.dialog.open(BookmarkFilterDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy(): void {
    this.bookmarkSub.unsubscribe();
  }

  remove(bookmark: Bookmark): void {
    this.progress.start();
    this.bookmarkService.deleteOneById(bookmark.id).subscribe(() => {
      this.progress.complete();
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
