import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Observable } from 'rxjs';

import { Post } from '../../../models/post.model';
import { Bookmark } from '../../../models/bookmark.model';
import { BookmarkService } from '../../../services/bookmark.service';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './latest-page.html',
  styleUrls: ['./latest-page.scss']
})
export class LatestPageComponent implements OnInit, OnDestroy {

  posts$: Observable<Post[]>;

  constructor(private postService: PostService, private bookmarkService: BookmarkService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.posts$ = this.postService.posts();
  }

  ngOnDestroy(): void {
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
