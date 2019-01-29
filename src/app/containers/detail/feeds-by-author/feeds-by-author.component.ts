import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/internal/operators';
import { forkJoin, Observable } from 'rxjs';
import * as _ from 'lodash';

import { Post } from '../../../models/post.model';
import { Bookmark } from '../../../models/bookmark.model';

import { AuthService } from '../../../services';
import { PostService } from '../../../services/post.service';
import { BookmarkService } from '../../../services/bookmark.service';

@Component({
  selector: 'dso-feeds-by-author',
  templateUrl: './feeds-by-author.component.html',
  styleUrls: ['./feeds-by-author.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedsByAuthorComponent implements OnInit {

  posts: Post[];
  pageNum: number;

  isFetching: boolean;
  isAuthorVisible: boolean;

  authorId: string;
  authorName: string;
  authorInfo: string;
  authorAvatar: string;

  constructor(
    private progress: NgProgress,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private postService: PostService,
    private bookmarkService: BookmarkService) {
    this.pageNum = 0;
    this.posts = [];
    this.isFetching = false;
    this.isAuthorVisible = false;

    this.route.params.subscribe(params => {
      this.authorId = params['id'];
    });
  }

  ngOnInit() {
    this.fetchPosts();
  }

  private fetchPosts() {
    this.progress.start();
    this.isFetching = true;

    // Services
    const email = this.authService.getUserInfo().user_name;
    let postService: Observable<Post[]>;

    postService = this.postService.posts({
      authorId: this.authorId,
      page: this.pageNum,
      per_page: 5
    });

    // Join bookmarks and post
    forkJoin(
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

      this.fetchAuthorInfo();

      this.cdr.markForCheck();
      this.progress.complete();
      this.isFetching = false;
    }, err => {
      this.progress.complete();
      this.isFetching = false;
    });
  }

  fetchAuthorInfo() {
    if (this.posts && this.posts.length > 0) {
      this.authorAvatar = this.posts[0].authorPhotoUrl;
      this.authorName = this.posts[0].authorName;
      this.authorInfo = this.posts[0].authorDetails;

      this.isAuthorVisible = true;
    }
  }

  addBookmark(value: Bookmark) {
    const bookmarkSub = this.bookmarkService.saveBookmark(value).subscribe((x: any) => {
      if (x.code === 0) {
        this.snackBar.open('Bookmark added', 'OK', {
          duration: 2000,
        });
      } else {
        this.snackBar.open('Bookmark failed', 'OK', {
          duration: 2000,
        });
      }
      bookmarkSub.unsubscribe();
    });
  }

  removeBookmark(id: string) {
    const bookmarkSub = this.bookmarkService.deleteOneById(id).subscribe((x: any) => {
      if (x.code === 0) {
        this.snackBar.open('Bookmark removed', 'OK', {
          duration: 2000,
        });
      } else {
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

}
