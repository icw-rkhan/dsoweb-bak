import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { NgProgress } from '@ngx-progressbar/core';

import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';
import { Bookmark } from '../../../models/bookmark.model';
import { BookmarkService } from '../../../services/bookmark.service';
import { map } from 'rxjs/internal/operators';
import * as _ from 'lodash';

@Component({
  templateUrl: './latest-page.html',
  styleUrls: ['./latest-page.scss']
})
export class LatestPageComponent implements OnInit, OnDestroy {

  posts$: Observable<Post[]>;

  private postSub: Subscription;

  constructor(private postService: PostService, private bookmarkService: BookmarkService,
              private snackBar: MatSnackBar, private progress: NgProgress) {
  }

  ngOnInit(): void {
    this.progress.start();
    this.posts$ = forkJoin(
      this.postService.posts(),
      this.bookmarkService.getAllByEmail('h1078660929@163.com')
    ).pipe(
      map(items => items[0].map(p =>
        Object.assign({}, p, {
          bookmarked: !_.isUndefined(items[1].find(b => +b.postId === p.id))
        })
      ))
    );

    this.postSub = this.posts$.subscribe(() => this.progress.complete());
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
