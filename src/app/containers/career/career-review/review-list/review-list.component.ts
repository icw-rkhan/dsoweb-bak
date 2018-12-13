import { Component, OnInit } from '@angular/core';

import { DSOCompany } from '../../../../models/dso-company.model';

@Component({
  selector: 'dso-career-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  companies: DSOCompany[];

  constructor() {
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
  }

  ngOnInit() {
  }

}
