import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy,
        ChangeDetectorRef, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import { map } from 'rxjs/internal/operators';
import { forkJoin, Subscription } from 'rxjs';
import * as _ from 'lodash';

import { Post } from '../../../models/post.model';

import { AuthService } from '../../../services';
import { UniteService } from '../../../services/unite.service';
import { BookmarkService } from '../../../services/bookmark.service';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'dso-unite-detail',
  templateUrl: './unite-detail.component.html',
  styleUrls: ['./unite-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniteDetailComponent implements OnInit, OnDestroy {

  type: string;
  article: Post;
  articles: Post[];

  subRoute: Subscription;

  @ViewChild('viewContainer') viewContainer: ElementRef;

  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  @ViewChild('postContent') postContent: ElementRef;

  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private uniteService: UniteService,
    private sharingService: SharingService,
    private bookmarkService: BookmarkService) {}

  ngOnInit() {
    this.progress.start();

    this.subRoute = this.route.params.subscribe(params => {
      const id = params['id'];
      this.type = params['type'];
      const issueId = params['issueId'];

      const postService = this.uniteService.findOneById(issueId);

      // get user email
      const email = this.authService.getUserInfo().user_name;

      // Join bookmarks and post
      const postSub = forkJoin(
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
        this.progress.complete();

        const bookmarkedArr = [];
        if (this.type === 'bookmark') {
          posts.map(item => {
            if (item.isBookmark) {
              bookmarkedArr.push(item);
            }
          });

          posts = bookmarkedArr;
        }

        let index = 0;
        posts.map(post => {
          if (post.id === id) {
            index = posts.indexOf(post);
          }
        });

        // move selected post to first place in array
        this.articles = this.arrayMove(posts, index, 0);

        this.cdr.markForCheck();
        postSub.unsubscribe();
      }, err => {
        this.progress.complete();
        postSub.unsubscribe();
      });
    });
  }

  ngOnDestroy() {
    this.progress.complete();

    this.subRoute.unsubscribe();
  }

  arrayMove(arr, fromIndex, toIndex) {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);

    return arr;
  }

  swipe(action) {
    const device = this.sharingService.getMyDevice();
    if (device === 'desktop') {
      return;
    }

    const step = document.body.scrollWidth;
    let index = 0;

    const currentPos = this.viewContainer.nativeElement.scrollLeft;
    const timer = setInterval(() => {
      if (step - index < 10) {
        index = index + (step - index);
      } else {
        index = index + 10;
      }

      if (action === this.SWIPE_ACTION.RIGHT) {
        this.viewContainer.nativeElement.scrollTo(currentPos - index, 0);
      } else {
        this.viewContainer.nativeElement.scrollTo(currentPos + index, 0);
      }

      if (index >= step) {
        clearInterval(timer);
      }
    }, 0);
  }

  removeBookmarkedItem(bookmarkId: string) {
    if (this.type === 'bookmark') {
      this.articles.map(item => {
        if (item.bookmarkId === bookmarkId) {
          const index = this.articles.indexOf(item);
          this.articles.splice(index, 1);

          this.cdr.markForCheck();
        }
      });
    }
  }
}
