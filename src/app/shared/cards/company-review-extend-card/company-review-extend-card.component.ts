import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dso-company-review-extend-card',
  templateUrl: './company-review-extend-card.component.html',
  styleUrls: ['./company-review-extend-card.component.scss']
})
export class CompanyReviewExtendCardComponent implements OnInit {

  @Input() review: any;

  rating: number;
  rateList = [
    {state: 'inactive'},
    {state: 'inactive'},
    {state: 'inactive'},
    {state: 'inactive'},
    {state: 'inactive'}
  ];

  constructor() { }

  ngOnInit() {
    this.rating = Math.round(parseInt(this.review.rating, 10));
  }

}
