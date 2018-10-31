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
    this.postService.search(this.term).subscribe(posts => {
      this.posts = posts;
      this.progress.complete();
    },
    err => {
      this.progress.complete();
    });
  }

  addBookmark(value: Bookmark) {
    console.log(value);
    const bookmarkSub = this.bookmarkService.saveBookmark(value).subscribe(x => {
      this.snackBar.open('Bookmark added', 'OK', {
        duration: 1000,
      });
      bookmarkSub.unsubscribe();
    });
  }

  removeBookmark(id: string) {
    console.log(id);
    const bookmarkSub = this.bookmarkService.deleteOneById(id).subscribe(x => {
      this.snackBar.open('Bookmark removed', 'OK', {
        duration: 1000,
      });
      bookmarkSub.unsubscribe();
    });
  }
}
