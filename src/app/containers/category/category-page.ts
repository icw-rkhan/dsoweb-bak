import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { MatSelectChange, MatSnackBar } from '@angular/material';
import { NgProgress } from '@ngx-progressbar/core';
import { map } from 'rxjs/internal/operators';
import * as _ from 'lodash';

import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Bookmark } from '../../models/bookmark.model';
import { BookmarkService } from '../../services/bookmark.service';
import { AuthService } from '../../services';

@Component({
  templateUrl: './category-page.html',
  styleUrls: ['./category-page.scss']
})
export class CategoryPageComponent implements OnInit {

  categories$: Category[];
  posts: Post[];
  sponsorId: number;
  isFetching: boolean;
  categoryId: number;
  page: number;

  private postSub: Subscription;
  private paramsSub: Subscription;
  private typeId: number;

  constructor(
    private categoryService: CategoryService, private postService: PostService,
    private progress: NgProgress, private bookmarkService: BookmarkService,
    private snackBar: MatSnackBar, private authService: AuthService) {
      this.isFetching = true;
      this.page = 1;
  }

  ngOnInit(): void {
    this.categoryService.categories.subscribe(date => {
      const categoryList = [];
      let i = 0;
      for (i = 0; i < date.length; i++) {
        const categoryItem = date[i];
        if (!categoryItem.name.includes('*')) {
          categoryList.push(categoryItem);
        }
      }

      this.categories$ = categoryList;
    });
  }

  selectCategory(event: MatSelectChange) {
    this.page = 1;
    this.posts = [];
    this.categoryId = event.value;
    this.fetchPost();
  }

  fetchPost() {
    this.progress.start();
    this.isFetching = true;

    const email = this.authService.getUserInfo().user_name;
    const postsSubs = forkJoin(
      this.postService.fetchByCategoryId({
        categoryId: this.categoryId,
        page: this.page,
        per_page: 5
      }),
      this.bookmarkService.getAllByEmail(email)
    ).pipe(
      map(items => items[0].map(p => {
        const bookmark = items[1].find(b => b.postId === p.id);
        return Object.assign({}, p, {
          bookmarked: !_.isUndefined(bookmark),
          bookmarkId: !_.isUndefined(bookmark) ? bookmark.id : undefined
        });
      }))
    ).subscribe(posts => {
      if (this.posts) {
        this.posts = [
          ...this.posts,
          ...posts
        ];
      } else {
        this.posts = posts;
      }

      this.isFetching = false;

      this.progress.complete();
      postsSubs.unsubscribe();
    }, err => {

      this.isFetching = false;

      this.progress.complete();
      postsSubs.unsubscribe();
    });
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

  loadMore() {
    this.page ++;
    this.fetchPost();
  }
}
