import { Component, OnInit, HostListener, ViewChild, ElementRef,
         ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import { map } from 'rxjs/internal/operators';
import { forkJoin, Subscription } from 'rxjs';
import * as _ from 'lodash';

import { BookmarkService } from '../../../services/bookmark.service';
import { SharingService } from 'src/app/services/sharing.service';
import { UniteService } from '../../../services/unite.service';
import { AuthService } from '../../../services';

import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-unite-view',
  templateUrl: './unite-view.component.html',
  styleUrls: ['./unite-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniteViewComponent implements OnInit, OnDestroy {

  id: string;

  posts: Post[];
  coverPage: Post;

  subRoute: Subscription;

  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  @ViewChild('viewContainer') viewContainer: ElementRef;

  constructor(
    private router: Router,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private uniteService: UniteService,
    private sharingService: SharingService,
    private bookmarkService: BookmarkService) {
      this.coverPage = new Post();
      this.coverPage.title = 'cover';
      this.coverPage.thumbnail = 'assets/images/unite/cover-page.png';
    }

  ngOnInit() {
    this.progress.start();
    this.subRoute = this.route.params.subscribe(params => {
      this.id = params['id'];

      const postService = this.uniteService.findOneById(this.id);

      // get an user's email
      const email = this.authService.getUserInfo().user_name;

      // Join bookmarks and post
      const uniteSub = forkJoin(
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

        this.posts = posts;

        this.cdr.markForCheck();
        uniteSub.unsubscribe();
      },
      err => {
        this.progress.complete();
        uniteSub.unsubscribe();
      });
    });
  }

  ngOnDestroy() {
    this.progress.complete();

    this.subRoute.unsubscribe();
  }

  onNormalScreen() {
    this.router.navigate([`/unite/thumbnail/${this.id}`]);
  }

  // user can swipe contents
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
}
