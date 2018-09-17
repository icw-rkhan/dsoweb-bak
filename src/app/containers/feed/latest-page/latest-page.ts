import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { NgProgress } from '@ngx-progressbar/core';

import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';
import { Bookmark } from '../../../models/bookmark.model';
import { BookmarkService } from '../../../services/bookmark.service';

@Component({
  templateUrl: './latest-page.html',
  styleUrls: ['./latest-page.scss']
})
export class LatestPageComponent implements OnInit, OnDestroy {

  posts$: Observable<Post[]>;

  // private postSub: Subscription;

  constructor(private postService: PostService, private bookmarkService: BookmarkService,
              private snackBar: MatSnackBar, private progress: NgProgress) {
  }

  ngOnInit(): void {
    // this.progress.start();
    this.posts$ = this.postService.posts();
    // this.postSub = this.posts$.subscribe(() => this.progress.complete());
  }

  ngOnDestroy(): void {
    // this.postSub.unsubscribe();
  }

  bookmark(value: Bookmark) {
    const bookmarkSub = this.bookmarkService.saveBookmark(value).subscribe(x => {
      this.snackBar.open('Bookmark added', 'OK', {
        duration: 2000,
      });
      bookmarkSub.unsubscribe();
    });
  }

}
