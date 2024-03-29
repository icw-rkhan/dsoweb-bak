import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { forkJoin, Subscription, Observable } from 'rxjs';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/internal/operators';
import * as _ from 'lodash';

import { Bookmark } from '../../../models/bookmark.model';
import { Post } from '../../../models/post.model';

import { BookmarkService } from '../../../services/bookmark.service';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services';

@Component({
  templateUrl: './posts-page.html',
  styleUrls: ['./posts-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    private progress: NgProgress,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private postService: PostService,
    private bookmarkService: BookmarkService) {
      this.isFetching = true;
      this.pageNum = 0;
  }

  ngOnInit(): void {
    // Fetch post type id param
    this.paramsSub = this.route.params.subscribe(params => {
      this.posts = [];
      // Params
      this.typeId = params['id'];
      this.sponsorId = params['sponsorId'];

      this.pageNum = 0;
      this.fetchPosts();
    });
  }

  ngOnDestroy(): void {
    this.progress.complete();
    this.postSub.unsubscribe();
    this.paramsSub.unsubscribe();
  }

  addBookmark(value: Bookmark) {
    const bookmarkSub = this.bookmarkService.saveBookmark(value).subscribe((x: any) => {
      if (x.code !== 0) {
        this.snackBar.open('Bookmark failed', 'OK', {
          duration: 2000,
        });
      }
      bookmarkSub.unsubscribe();
    });
  }

  removeBookmark(id: string) {
    const bookmarkSub = this.bookmarkService.deleteOneById(id).subscribe((x: any) => {
      if (x.code !== 0) {
        this.snackBar.open('Bookmark failed', 'OK', {
          duration: 2000,
        });
      }
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
    let postService: Observable<Post[]>;
    if (this.sponsorId) {
      postService = this.postService.fetchBySponsorId({
        type: this.typeId,
        sponsorId: this.sponsorId,
        page: this.pageNum,
        per_page: 5
      });
    } else if (this.typeId) {
      postService = this.postService.fetchByContentTypeId({
        type: this.typeId,
        page: this.pageNum,
        per_page: 5
      });
    } else {
      postService = this.postService.posts({
        page: this.pageNum,
        isFeatured: true,
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
          bookmarkId: !_.isUndefined(bookmark) ? bookmark.postId : undefined
        });
      }))
    ).subscribe(posts => {
      this.posts = [
        ...this.posts,
        ...posts
      ];

      this.cdr.markForCheck();
      this.progress.complete();
      this.isFetching = false;
    }, err => {
      this.progress.complete();
      this.isFetching = false;
    });
  }

}
