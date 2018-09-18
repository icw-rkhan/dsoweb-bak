import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { NgProgress } from '@ngx-progressbar/core';
import * as _ from 'lodash';
import { map } from 'rxjs/internal/operators';

import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';
import { Bookmark } from '../../../models/bookmark.model';
import { BookmarkService } from '../../../services/bookmark.service';
import { AuthService } from '../../../services';

@Component({
  templateUrl: './latest-page.html',
  styleUrls: ['./latest-page.scss']
})
export class LatestPageComponent implements OnInit, OnDestroy {

  posts$: Observable<Post[]>;

  private postSub: Subscription;

  constructor(private postService: PostService, private bookmarkService: BookmarkService,
              private snackBar: MatSnackBar, private progress: NgProgress, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.progress.start();
    const email = this.authService.getUserInfo().user_name;
    this.posts$ = forkJoin(
      this.postService.posts(),
      this.bookmarkService.getAllByEmail(email)
    ).pipe(
      map(items => items[0].map(p => {
        const bookmark = items[1].find(b => +b.postId === p.id);
        return Object.assign({}, p, {
          bookmarked: !_.isUndefined(bookmark),
          bookmarkId: !_.isUndefined(bookmark) ? bookmark.id : undefined
        });
      }))
    );

    this.postSub = this.posts$.subscribe(() => this.progress.complete());
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

  addBookmark(value: Bookmark) {
    const bookmarkSub = this.bookmarkService.saveBookmark(value).subscribe(x => {
      this.snackBar.open('Bookmark added', 'OK', {
        duration: 2000,
      });
      bookmarkSub.unsubscribe();
    });
  }

  removeBookmark(id: string) {
    const bookmarkSub = this.bookmarkService.deleteOneById(id).subscribe(x => {
      this.snackBar.open('Bookmark removed', 'OK', {
        duration: 2000,
      });
      bookmarkSub.unsubscribe();
    });
  }

}
