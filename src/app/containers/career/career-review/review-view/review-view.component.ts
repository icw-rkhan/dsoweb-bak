import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';

import { CompanyService } from '../../../../services/company.service';
import { Review } from '../../../../models/reivew.model';

@Component({
  selector: 'dso-career-review-view',
  templateUrl: './review-view.component.html',
  styleUrls: ['./review-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewViewComponent implements OnInit, OnDestroy {

  id: string;
  name: string;
  rate: number;
  flag: boolean;
  activeSort: any;
  activeRefine: any;
  activedSortId: number;
  activedRefineId: number;
  isCheckedSort: boolean;
  isCheckedRefine: boolean;
  isAscSortByDate: boolean;
  isAscSortByRating: boolean;

  reviews: Review[];
  allReviews: Review[];

  rateList = [
    {state: false},
    {state: false},
    {state: false},
    {state: false},
    {state: false}
  ];

  sortType = [
    {'id': 0, 'title': 'Date', 'status': 1},
    {'id': 1, 'title': 'Rating', 'status': 0}
  ];

  refineType = [
    {'id': 0, 'title': 'All', 'status': 1},
    {'id': 1, 'title': 'Current Employee', 'status': 0},
    {'id': 2, 'title': 'Former Employee', 'status': 0}
  ];

  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private companyService: CompanyService) {
    this.reviews = [];

    this.flag = false;
    this.activedSortId = 0;
    this.activedRefineId = 0;
    this.isCheckedSort = false;
    this.isCheckedRefine = false;
    this.isAscSortByDate = false;
    this.isAscSortByRating = false;
    this.activeSort = this.sortType[0];
    this.activeRefine = this.refineType[0];

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.name = params['name'];
    });
  }

  ngOnInit() {
   this.onLoadContent();

   window.addEventListener('scroll', this.onScrollEvent, true);
  }

  ngOnDestroy() {
    this.progress.complete();

    window.removeEventListener('scroll', this.onScrollEvent, true);
  }

  onScrollEvent = (): void => {
    this.clear();

    this.cdr.markForCheck();
  }

  onLoadContent() {
    this.progress.start();

    const body = {
      'dsoId': this.id,
      'sort': this.activeSort.id,
      'start': this.activeRefine.id
    };

    this.companyService.getCommentByCompanyId(body).subscribe(reviews => {
      this.progress.complete();

      this.allReviews = reviews;

      this.reviews = this.allReviews;

      this.reviews = this.reviews.sort((review1, review2) =>
        new Date(review2.reviewDate).getTime() - new Date(review1.reviewDate).getTime());

      this.reviews = this.reviews.sort((review1, review2) =>
        review2.rating - review1.rating);

      this.calcRating();

      this.cdr.markForCheck();
    },
    err => {
      this.progress.complete();
    });
  }

  calcRating() {
    let totalRating = 0;
    this.allReviews.map(review => {
      totalRating = totalRating + review.rating;
    });

    this.rate = Math.round(totalRating / this.allReviews.length);
  }

  onSort(index: number) {
    this.activeSort = this.sortType[index];
    this.activedSortId = index;

    if (!this.flag) {
      this.isCheckedSort = false;
    }

    const temp = this.reviews;

    if (this.activeSort.id === 0) {
      if (!this.flag) {
        this.isAscSortByDate = !this.isAscSortByDate;
      }

      this.reviews = temp.sort((review1, review2) => {
        if (this.isAscSortByDate) {
          return new Date(review1.reviewDate).getTime() - new Date(review2.reviewDate).getTime();
        } else {
          return new Date(review2.reviewDate).getTime() - new Date(review1.reviewDate).getTime();
        }
      });
    } else {
      if (!this.flag) {
        this.isAscSortByRating = !this.isAscSortByRating;
      }

      this.reviews = temp.sort((review1, review2) => {
        if (this.isAscSortByRating) {
          return review1.rating - review2.rating;
        } else {
          return review2.rating - review1.rating;
        }
      });
    }
  }

  onRefine(index: number) {
    this.activeRefine = this.refineType[index];
    this.isCheckedRefine = false;
    this.activedRefineId = index;

    if (this.activeRefine.id === 1) {
      this.reviews = this.allReviews.filter(review => review.isCurrentEmployee === true);
    } else if (this.activeRefine.id === 2) {
      this.reviews = this.allReviews.filter(review => review.isFormerEmployee === true);
    } else {
      this.reviews = this.allReviews;
    }

    this.flag = true;

    this.onSort(this.activedSortId);

    this.flag = false;
  }

  onCheckSortOption() {
    this.isCheckedSort = !this.isCheckedSort;
    this.isCheckedRefine = false;
  }

  onCheckRefineOption() {
    this.isCheckedRefine = !this.isCheckedRefine;
    this.isCheckedSort = false;
  }

  clear() {
    this.isCheckedRefine = false;
    this.isCheckedSort = false;
  }
}
