import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UniteService } from '../../../services/unite.service';
import { Post } from '../../../models/post.model';
import { NgProgress } from '@ngx-progressbar/core';
import { Unite } from '../../../models/unite.model';

@Component({
  selector: 'dso-unite-thumbnail',
  templateUrl: './unite-thumbnail.component.html',
  styleUrls: ['./unite-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniteThumbnailComponent implements OnInit {

  issue: Unite;
  coverPage: Post;
  articles: Post[];

  @ViewChild('viewContainer') viewContainer: ElementRef;

  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private uniteService: UniteService) {
      this.coverPage = new Post();
      this.coverPage.thumbnail = 'assets/images/unite/cover-page.png';
      this.coverPage.title = 'Issue Cover';
  }

  ngOnInit() {
    this.progress.start();

    this.route.params.subscribe(params => {
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
        this.articles = posts;

        this.cdr.detectChanges();

        this.progress.complete();
        uniteSub.unsubscribe();
      },
      err => {
        this.progress.complete();
        uniteSub.unsubscribe();
      });
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
