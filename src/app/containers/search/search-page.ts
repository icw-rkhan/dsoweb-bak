import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/internal/operators';
import { forkJoin, Subscription } from 'rxjs';
import * as _ from 'lodash';

import { AuthService } from '../../services';
import { PostService } from '../../services/post.service';
import { BookmarkService } from '../../services/bookmark.service';

import { Post } from '../../models/post.model';
import { Bookmark } from '../../models/bookmark.model';

@Component({
  templateUrl: './search-page.html',
  styleUrls: ['./search-page.scss'],
})
export class SearchPageComponent implements OnInit {

  posts: Post[];

  term: string;
  message: string;
  no_message: string;

  isNothing: boolean;
  validCancel: boolean;
  subPost: Subscription;

  constructor(
    private progress: NgProgress,
    private postService: PostService,
    private authService: AuthService,
    private bookmarkService: BookmarkService,
    private snackBar: MatSnackBar) {
      this.isNothing = false;
      this.validCancel = false;

      this.message = 'Search by category, author, or content type';
      this.no_message = 'No content found matching search terms';
  }

  ngOnInit(): void {
  }

  onSearch() {
    this.progress.start();

    const body = {
      'searchValue': this.term,
      'unite': false,
      'skip': 0,
      'limit': 0
    };

    const postService = this.postService.search(body);

    const email = this.authService.getUserInfo().user_name;

    // Join bookmarks and post
    this.subPost = forkJoin(
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
      this.posts = posts;

      if (this.posts.length === 0) {
        this.isNothing = true;
      }

      this.progress.complete();
      this.subPost.unsubscribe();
    },
    err => {
      this.isNothing = true;
      this.progress.complete();
    });
  }

  onCancel() {
    this.term = '';
    this.isNothing = false;
    this.validCancel = false;

    if (this.subPost) {
      this.subPost.unsubscribe();
    }

    this.progress.complete();
    setTimeout(() => {
      this.posts = [];
    }, 100);
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
}
