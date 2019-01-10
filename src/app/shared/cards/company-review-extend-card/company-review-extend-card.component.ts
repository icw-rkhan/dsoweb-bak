import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Review } from '../../../models/reivew.model';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'dso-company-review-extend-card',
  templateUrl: './company-review-extend-card.component.html',
  styleUrls: ['./company-review-extend-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyReviewExtendCardComponent implements OnInit {

  @Input() review: Review;
  @Input() companyName: string;

  employeeIndicator: string;

  rateList = [
    {state: 'inactive'},
    {state: 'inactive'},
    {state: 'inactive'},
    {state: 'inactive'},
    {state: 'inactive'}
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.review && this.review.isCurrentEmployee) {
      this.employeeIndicator = 'Current Employee';
    }

    if (this.review && this.review.isFormerEmployee) {
      this.employeeIndicator = 'Former Employee';
    }
  }

  onGoToReviewDetail() {
    const params: NavigationExtras = {
      queryParams: this.review
    };

    this.router.navigate([`/career/review/detail/${this.companyName}`], params);
  }
}
