import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';

import { Review } from '../../../../models/reivew.model';
import { Subscription } from 'rxjs';

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

  subRoute: Subscription;

  constructor(
    private progress: NgProgress,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.progress.start();

    this.subRoute = this.route.queryParams.subscribe((params: Review) => {
      this.progress.complete();

      this.review = params;

      this.rating = Math.round(this.review.rating);

      this.cdr.markForCheck();
    },
    err => {
      this.progress.complete();
    });
  }

  ngOnDestroy() {
    this.progress.complete();

    this.subRoute.unsubscribe();
  }

}
