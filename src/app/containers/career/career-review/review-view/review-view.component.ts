import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DSOCompanyReview } from '../../../../models/dso-company-review.model';

@Component({
  selector: 'dso-career-review-view',
  templateUrl: './review-view.component.html',
  styleUrls: ['./review-view.component.scss']
})
export class ReviewViewComponent implements OnInit {

  id: string;
  name: string;
  rate: number;
  reviews: any[];
  activeSort: any;
  activeRefine: any;
  activedIndex: number;
  isCheckedSort: boolean;
  isCheckedRefine: boolean;
  review: DSOCompanyReview;

  rateList = [
    {state: false},
    {state: false},
    {state: false},
    {state: false},
    {state: false}
  ];

  sortType = [
    {'id': 0, 'title': 'ALL Reviews', 'status': 1},
    {'id': 1, 'title': 'Recommends', 'status': 0},
    {'id': 2, 'title': 'Approved of CEO', 'status': 0},
    {'id': 3, 'title': 'Current Employee', 'status': 0},
    {'id': 4, 'title': 'Former Employee', 'status': 0},
    {'id': 5, 'title': 'Date (Newest first)', 'status': 0},
    {'id': 6, 'title': 'Date (Oldest first)', 'status': 0},
  ];

  refineType = [
    {'id': 0, 'title': 'All Stars', 'status': 1},
    {'id': 5, 'title': '5 Stars', 'status': 0},
    {'id': 4, 'title': '4 Stars', 'status': 0},
    {'id': 3, 'title': '3 Stars', 'status': 0},
    {'id': 2, 'title': '2 Stars', 'status': 0},
    {'id': 1, 'title': '1 Stars', 'status': 0},
  ];

  constructor(private route: ActivatedRoute) {
    this.reviews = [];

    this.activedIndex = 0;
    this.isCheckedSort = false;
    this.isCheckedRefine = false;
    this.activeSort = this.sortType[0];
    this.activeRefine = this.refineType[0];

    this.review = new DSOCompanyReview();

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.name = params['name'];
    });
  }

  ngOnInit() {
    this.review.rating = '4.1';
    this.review.reviewNum = '789';

    const review = {
      'reviewTitle': 'Super Cool',
      'rating': 4,
      'employeeIndicator': 'Anonymous Employee',
      'reviewDate': '28 June 2018',
      'reviewText': 'Lorem ipsum dolor sit amet, consectetur...',
      'isRecommend': true,
      'isApprove': true
    };

    const review2 = {
      'reviewTitle': 'Super Cool',
      'rating': 5,
      'employeeIndicator': 'Anonymous Employee',
      'reviewDate': '28 June 2018',
      'reviewText': 'Lorem ipsum dolor sit amet, consectetur...',
      'isRecommend': true,
      'isApprove': false
    };

    this.reviews.push(review);
    this.reviews.push(review2);

    this.rate = Math.round(parseInt(this.review.rating, 10));
  }

  onSort(index: number) {
    this.activeSort = this.sortType[index];
    this.isCheckedSort = false;
    this.activedIndex = index;
  }

  onRefine(index: number) {
    this.activeRefine = this.refineType[index];
    this.isCheckedRefine = false;
    this.activedIndex = index;
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
