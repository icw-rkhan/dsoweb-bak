import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { DSOCompany } from '../../../models/dso-company.model';

@Component({
  selector: 'dso-company-review-card',
  templateUrl: './company-review-card.component.html',
  styleUrls: ['./company-review-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyReviewCardComponent implements OnInit {

  @Input() company: DSOCompany;
  @Input() type: number;

  rating: number;
  rateList = [
    {state: 'inactive'},
    {state: 'inactive'},
    {state: 'inactive'},
    {state: 'inactive'},
    {state: 'inactive'}
  ];

  constructor(private router: Router) {
    this.rating = 0;
  }

  ngOnInit() {
    if (this.company.rating) {
      this.rating = Math.round(parseInt(this.company.rating, 10));
    }
  }

  onGoToReviewList() {
    this.router.navigate([`/career/review/view/${this.company.id}/${this.company.name}`]);
  }

}
