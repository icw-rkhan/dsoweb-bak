import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,
        ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { SharingService } from 'src/app/services/sharing.service';
import { UniteService } from '../../../services/unite.service';

import { Post } from '../../../models/post.model';
import { Unite } from '../../../models/unite.model';

@Component({
  selector: 'dso-unite-thumbnail',
  templateUrl: './unite-thumbnail.component.html',
  styleUrls: ['./unite-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniteThumbnailComponent implements OnInit, OnDestroy {

  issue: Unite;
  coverPage: Post;
  articles: Post[];

  subRoute: Subscription;

  @ViewChild('viewContainer') viewContainer: ElementRef;

  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private uniteService: UniteService,
    private sharingService: SharingService) {
      this.coverPage = new Post();
      this.coverPage.thumbnail = 'assets/images/unite/cover-page.png';
      this.coverPage.title = 'Issue Cover';
  }

  ngOnInit() {
    this.progress.start();

    this.subRoute = this.route.params.subscribe(params => {
      const id = params['id'];

      const body = {
        'skip': 0,
        'limit': 0
      };

      const issueSub = this.uniteService.findAll(body).subscribe(unites => {
        const temp = [];

        unites.map(unite => {
          if (unite.id === id) {
            temp.push(unite);
          }
        });

        this.issue = temp[0];
        issueSub.unsubscribe();
      });

      const uniteSub = this.uniteService.findOneById(id).subscribe(posts => {
        this.progress.complete();

        this.articles = posts;

        this.cdr.detectChanges();
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

  swipe(action) {
    const device = this.sharingService.getMyDevice();
    if (device === 'desktop') {
      return;
    }

    const step = document.body.scrollWidth * 0.7 + 25;
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
