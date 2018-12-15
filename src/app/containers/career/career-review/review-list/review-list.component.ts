import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { DSOCompany } from '../../../../models/dso-company.model';
import { NgProgress } from '@ngx-progressbar/core';
import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'dso-career-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewListComponent implements OnInit {

  companies: DSOCompany[];

  constructor(
    private progress: NgProgress,
    private cdr: ChangeDetectorRef,
    private companyService: CompanyService) {
    this.companies = [];

    const company = new DSOCompany();
    company.id = '1';
    company.name = 'THE BRONX - Dental Center';
    company.rating = '4.1';
    company.reviews = '789';

    const company2 = new DSOCompany();
    company2.id = '2';
    company2.name = 'Fresh Dent';
    company2.rating = '5';
    company2.reviews = '119';

    this.companies.push(company);
    this.companies.push(company2);

    this.cdr.markForCheck();
  }

  ngOnInit() {
  }

}
