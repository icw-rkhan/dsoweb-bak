import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { forkJoin } from 'rxjs';
import * as _ from 'lodash';

import { UniteService } from '../../../services/unite.service';
import { BookmarkService } from '../../../services/bookmark.service';
import { AuthService } from '../../../services';

import { Post } from '../../../models/post.model';
import { Unite } from '../../../models/unite.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'dso-unite-bookmark',
  templateUrl: './unite-bookmark.component.html',
  styleUrls: ['./unite-bookmark.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniteBookmarkComponent implements OnInit {

  issueId: string;

  issue: Unite;
  posts: Post[];

  @ViewChild('viewContainer') viewContainer: ElementRef;

  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private uniteService: UniteService,
    private bookmarkService: BookmarkService) {}

  ngOnInit() {
    this.progress.start();

    this.route.params.subscribe(params => {
     this.issueId = params['id'];

      const body = {
        'skip': 0,
        'limit': 0
      };

      const issueSub = this.uniteService.findAll(body).subscribe(unites => {
        const temp = [];

        unites.map(unite => {
          if (unite.id === this.issueId) {
            temp.push(unite);
          }
        });

        this.issue = temp[0];
        issueSub.unsubscribe();
      });

      this.fetchArticles();
    });
  }

  fetchArticles() {
    this.posts = [];

    const unitePosts = this.uniteService.findOneById(this.issueId);
    const email = this.authService.getUserInfo().user_name;

    // Join bookmarks and post
    forkJoin(
      unitePosts,
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
      posts.map(post => {
        if (post.isBookmark) {
          this.posts.push(post);
        }
      });

      this.cdr.detectChanges();

      this.progress.complete();
    },
    err => {
      this.progress.complete();
    });
  }

  onRemoveBookmark(id) {
    const bookmarkSub = this.bookmarkService.deleteOneById(id).subscribe((x: any) => {
      if (x.code === 0) {
        this.snackBar.open('Bookmark removed', 'OK', {
          duration: 2000,
        });

        const newPosts = [];
        this.posts.map(post => {
          if (post.id !== id) {
            newPosts.push(post);
          }
        });

        this.posts = newPosts;

        this.cdr.markForCheck();
      } else {
        this.snackBar.open('Bookmark failed', 'OK', {
          duration: 2000,
        });
      }

      bookmarkSub.unsubscribe();
    });
  }

  swipe(action) {
    const step = document.body.scrollWidth * 0.7 + 25;

    const currentPos = this.viewContainer.nativeElement.scrollLeft;
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.viewContainer.nativeElement.scrollTo(currentPos - step, 0);
    } else {
      this.viewContainer.nativeElement.scrollTo(currentPos + step, 0);
    }
  }
}
