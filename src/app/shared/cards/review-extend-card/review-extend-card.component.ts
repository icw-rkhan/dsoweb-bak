import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Review } from '../../../models/reivew.model';

@Component({
  selector: 'dso-review-extend-card',
  templateUrl: './review-extend-card.component.html',
  styleUrls: ['./review-extend-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewExtendCardComponent implements OnInit {

  @Input() review: Review;

  employeeIndicator: string;

  rateList = [{state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}];

  constructor() { }

  ngOnInit() {
    if (this.review.isCurrentEmployee) {
      this.employeeIndicator = 'Current Employee';
    }

    if (this.review.isFormerEmployee) {
      this.employeeIndicator = 'Former Employee';
    }
  }

}
