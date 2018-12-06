import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../../../models/company.model';

@Component({
  selector: 'dso-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {

  @Input() company: Company;

  rating: number;
  rateList = [{state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}];

  constructor() {}

  ngOnInit() {
    this.rating = Math.round(parseInt(this.company.rating, 10));
  }

}
