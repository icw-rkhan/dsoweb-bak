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
  activeSort: any;
  activeRefine: any;
  activedSortId: number;
  activedRefineId: number;
  isCheckedSort: boolean;
  isCheckedRefine: boolean;

  reviews: Review[];

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
    {'id': 0, 'title': 'Current Employee', 'status': 1},
    {'id': 1, 'title': 'Former Employee', 'status': 0}
  ];

  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private companyService: CompanyService) {
    this.reviews = [];

    this.activedSortId = 0;
    this.activedRefineId = 0;
    this.isCheckedSort = false;
    this.isCheckedRefine = false;
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

      this.reviews = reviews;

      this.calcRating();

      this.cdr.markForCheck();
    },
    err => {
      this.progress.complete();
    });
  }

  calcRating() {
    let totalRating = 0;
    this.reviews.map(review => {
      totalRating = totalRating + review.rating;
    });

    this.rate = Math.round(totalRating / this.reviews.length);
  }

  onSort(index: number) {
    this.activeSort = this.sortType[index];
    this.isCheckedSort = false;
    this.activedSortId = index;

    this.onLoadContent();
  }

  onRefine(index: number) {
    this.activeRefine = this.refineType[index];
    this.isCheckedRefine = false;
    this.activedRefineId = index;

    this.onLoadContent();
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
