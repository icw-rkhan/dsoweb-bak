import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NgProgress } from '@ngx-progressbar/core';

import { BookmarkService } from '../../services/bookmark.service';
import { BookmarkFilterDialogComponent } from './bookmark-filter-dialog/bookmark-filter-dialog.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  templateUrl: './bookmarks-page.html',
  styleUrls: ['./bookmarks-page.scss']
})
export class BookmarksPageComponent implements OnInit, OnDestroy {

  posts: Post[];

  private bookmarkSub: Subscription;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private bookmarkService: BookmarkService,
              private postService: PostService, private progress: NgProgress) {
  }

  ngOnInit(): void {
    this.progress.start();
    const bookmarks$ = this.bookmarkService.getAllByEmail('h1078660929@163.com');

    this.bookmarkSub = bookmarks$.subscribe(bookmarks => {
      const posts = [];
      bookmarks.forEach(bookmark => {
        const innerSub = this.postService.fetchById(+bookmark.postId)
          .subscribe(p => {
            posts.push(p);
            if (bookmarks.length === posts.length) {
              this.posts = posts;
              // this.progress.complete();
            }
            innerSub.unsubscribe();
          });
      });
    });
  }

  openFilter(): void {
    const dialogRef = this.dialog.open(BookmarkFilterDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnDestroy(): void {
    this.bookmarkSub.unsubscribe();
  }

  remove(post: Post): void {
    this.progress.start();
    this.bookmarkService.deleteOneById(post.id.toString()).subscribe(() => {
      this.progress.complete();
      this.posts = this.posts.filter(b => b.id !== post.id);
      this.snackBar.open('Bookmark removed', 'OK', {
        duration: 2000,
      });
    });
  }

}
