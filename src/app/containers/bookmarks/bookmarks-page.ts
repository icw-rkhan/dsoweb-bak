import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NgProgress } from '@ngx-progressbar/core';

import { BookmarkService } from '../../services/bookmark.service';
import { BookmarkFilterDialogComponent } from './bookmark-filter-dialog/bookmark-filter-dialog.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { AuthService } from '../../services';
import { filter } from 'rxjs/internal/operators';
import { FilterDialogStatus } from '../../enums/filter-dialog-status';

@Component({
  templateUrl: './bookmarks-page.html',
  styleUrls: ['./bookmarks-page.scss']
})
export class BookmarksPageComponent implements OnInit, OnDestroy {

  posts: Post[];

  private bookmarkSub: Subscription;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private bookmarkService: BookmarkService,
              private postService: PostService, private progress: NgProgress, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.fetchBookmarks();
  }

  openFilter(): void {
    const dialogRef = this.dialog.open(BookmarkFilterDialogComponent, {
      width: '300px',
    });

    const dialogSub = dialogRef.afterClosed().pipe(
      filter(result => result !== undefined)
    ).subscribe(result => {
      if (FilterDialogStatus.Clear === result) {
        this.fetchBookmarks();
      } else {
        this.fetchBookmarks(result);
      }

      dialogSub.unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this.bookmarkSub.unsubscribe();
  }

  remove(post: Post): void {
    this.progress.start();
    this.bookmarkService.deleteOneById(post.bookmarkId).subscribe(() => {
      this.progress.complete();
      this.posts = this.posts.filter(b => b.id !== +post.id);
      this.snackBar.open('Bookmark removed', 'OK', {
        duration: 2000,
      });
    });
  }

  private fetchBookmarks(categoryId?: number): void {
    this.progress.start();

    const email = this.authService.getUserInfo().user_name;
    const bookmarks$ = this.bookmarkService.getAllByEmail(email);

    this.bookmarkSub = bookmarks$.subscribe(bookmarks => {
      const posts = [];
      let bookmarksLength = 0;
      // Iterate bookmarks to find its post information
      bookmarks.forEach(bookmark => {
        const innerSub = this.postService.fetchById(+bookmark.postId)
          .subscribe(p => {
            console.log(categoryId);
            // Check if we are filtering by category
            if (categoryId === undefined || p.categories.find(c => c.id === categoryId) !== undefined) {
              p.bookmarkId = bookmark.id;
              posts.push(p);
            }
            if (bookmarks.length === ++bookmarksLength) {
              this.posts = posts;
            }

            this.progress.complete();
            innerSub.unsubscribe();
          },
          err => {

            this.progress.complete();
            innerSub.unsubscribe();
          });
      });
    });
  }

}
