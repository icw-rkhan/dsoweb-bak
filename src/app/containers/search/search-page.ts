import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { MatSnackBar } from '@angular/material';

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

  constructor(
    private postService: PostService,
    private progress: NgProgress,
    private bookmarkService: BookmarkService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onSearch() {
    this.progress.start();

    const body = {
      'searchValue': this.term,
      'united': false,
      'skip': 0,
      'limit': 10
    };

    this.postService.search(body).subscribe(posts => {
      this.posts = posts;
      this.progress.complete();
    },
    err => {
      this.progress.complete();
    });
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
