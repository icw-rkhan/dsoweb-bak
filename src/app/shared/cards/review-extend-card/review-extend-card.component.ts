import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dso-review-extend-card',
  templateUrl: './review-extend-card.component.html',
  styleUrls: ['./review-extend-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewExtendCardComponent implements OnInit {

  rating: number;
  rateList = [{state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}];

  constructor() { }

  ngOnInit() {
    this.rating = 4;
  }

}
