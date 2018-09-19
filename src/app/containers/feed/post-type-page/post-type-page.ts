import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash';

import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';
import { AuthService } from '../../../services';
import { BookmarkService } from '../../../services/bookmark.service';
import { Bookmark } from '../../../models/bookmark.model';

@Component({
  templateUrl: './post-type-page.html',
  styleUrls: ['./post-type-page.scss']
})
export class PostTypePageComponent implements OnInit, OnDestroy {

  posts: Post[];

  private postSub: Subscription;
  private paramsSub: Subscription;

  constructor(private postService: PostService, private progress: NgProgress, private route: ActivatedRoute,
              private authService: AuthService, private bookmarkService: BookmarkService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // Fetch post type id param
    this.paramsSub = this.route.params.subscribe(params => {
      this.progress.start();

      const id = +params['id'];
      const email = this.authService.getUserInfo().user_name;

      // Join bookmarks and post
      this.postSub = forkJoin(
        this.postService.fetchByCategory(id),
        this.bookmarkService.getAllByEmail(email)
      ).pipe(
        map(items => items[0].map(p => {
          const bookmark = items[1].find(b => +b.postId === p.id);
          return Object.assign({}, p, {
            bookmarked: !_.isUndefined(bookmark),
            bookmarkId: !_.isUndefined(bookmark) ? bookmark.id : undefined
          });
        }))
      ).subscribe(posts => {
        this.posts = posts;
        this.progress.complete();
      });
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.paramsSub.unsubscribe();
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