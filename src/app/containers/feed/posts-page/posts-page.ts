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
  templateUrl: './posts-page.html',
  styleUrls: ['./posts-page.scss'],
})
export class PostsPageComponent implements OnInit, OnDestroy {

  posts: Post[];
  pageNum: number;
  sponsorId: number;
  isFetching: boolean;

  private postSub: Subscription;
  private paramsSub: Subscription;
  private typeId: number;

  constructor(
    private postService: PostService,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private authService: AuthService,
    private bookmarkService: BookmarkService,
    private snackBar: MatSnackBar) {
      this.isFetching = true;
      this.pageNum = 1;
  }

  ngOnInit(): void {
    // Fetch post type id param
    this.paramsSub = this.route.params.subscribe(params => {
      this.posts = [];
      // Params
      this.typeId = params['id'];
      this.sponsorId = params['sponsorId'];

      this.fetchPosts();
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.paramsSub.unsubscribe();
  }

  addBookmark(value: Bookmark) {
    const bookmarkSub = this.bookmarkService.saveBookmark(value).subscribe(x => {
      this.snackBar.open('Bookmark added', 'OK', {
        duration: 1000,
      });
      bookmarkSub.unsubscribe();
    });
  }

  removeBookmark(id: string) {
    const bookmarkSub = this.bookmarkService.deleteOneById(id).subscribe(x => {
      this.snackBar.open('Bookmark removed', 'OK', {
        duration: 1000,
      });
      bookmarkSub.unsubscribe();
    });
  }

  loadMore(page: number) {
    this.pageNum = page;
    this.fetchPosts();
  }

  private fetchPosts() {
    this.progress.start();
    this.isFetching = true;

    // Services
    const email = this.authService.getUserInfo().user_name;
    let postService = this.postService.posts({
      page: this.pageNum,
      per_page: 5
    });

    if (!_.isUndefined(this.sponsorId)) {
      postService = this.postService.fetchBySponsorId({
        type: this.typeId,
        sponsorId: this.sponsorId,
        page: this.pageNum,
        per_page: 5
      });
    } else if (!_.isUndefined(this.typeId)) {
      postService = this.postService.fetchByContentTypeId({
        type: this.typeId,
        page: this.pageNum,
        per_page: 5
      });
    }

    // Join bookmarks and post
    this.postSub = forkJoin(
      postService,
      this.bookmarkService.getAllByEmail(email)
    ).pipe(
      map(items => items[0].map(p => {
        const bookmark = items[1].find(b => b.postId === p.id);
        return Object.assign({}, p, {
          isBookmark: !_.isUndefined(bookmark),
          bookmarkId: !_.isUndefined(bookmark) ? bookmark.id : undefined
        });
      }))
    ).subscribe(posts => {
      this.posts = [
        ...this.posts,
        ...posts
      ];
      this.progress.complete();
      this.isFetching = false;
    }, err => {
      this.progress.complete();
      this.isFetching = false;
    });
  }

}
