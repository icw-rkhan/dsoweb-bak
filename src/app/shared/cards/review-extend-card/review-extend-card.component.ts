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

  rateList = [{state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}];

  constructor() { }

  ngOnInit() {
  }

}
