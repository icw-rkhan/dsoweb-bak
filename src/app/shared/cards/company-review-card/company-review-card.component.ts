import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { DSOCompany } from '../../../models/dso-company.model';

@Component({
  selector: 'dso-company-review-card',
  templateUrl: './company-review-card.component.html',
  styleUrls: ['./company-review-card.component.scss']
})
export class CompanyReviewCardComponent implements OnInit {

  @Input() company: DSOCompany;

  rating: number;
  rateList = [{state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}];

  constructor(private router: Router) {}

  ngOnInit() {
    this.rating = Math.round(parseInt(this.company.rating, 10));
  }

  onGoToCompanyDetail() {
    this.router.navigate([`/career/detail/${this.company.id}`]);
  }

}
