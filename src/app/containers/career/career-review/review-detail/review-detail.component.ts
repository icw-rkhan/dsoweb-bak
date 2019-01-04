import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';

import { Review } from '../../../../models/reivew.model';

@Component({
  selector: 'dso-career-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewDetailComponent implements OnInit, OnDestroy {

  review: any;
  rating: number;

  rateList = [
    {state: 'inactive'},
    {state: 'inactive'},
    {state: 'inactive'},
    {state: 'inactive'},
    {state: 'inactive'}
  ];

  constructor(
    private progress: NgProgress,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.progress.start();

    this.route.queryParams.subscribe((params: Review) => {
      this.progress.complete();

      this.review = params;

      this.rating = Math.round(parseInt(this.review.rating, 10));

      this.cdr.markForCheck();
    },
    err => {
      this.progress.complete();
    });
  }

  ngOnDestroy() {
    this.progress.complete();
  }

}
