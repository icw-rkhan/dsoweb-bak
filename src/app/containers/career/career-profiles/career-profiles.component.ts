import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

import { Company } from '../../../models/company.model';
import { JobService } from '../../../services/job.service';
import { CompanyService } from '../../../services/company.service';
import { DSOCompany } from '../../../models/dso-company.model';

@Component({
  selector: 'dso-career-profiles',
  templateUrl: './career-profiles.component.html',
  styleUrls: ['./career-profiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerProfilesComponent implements OnInit {

  companies: DSOCompany[];

  constructor(
    private progress: NgProgress,
    private jobService: JobService,
    private companyService: CompanyService) {
    this.companies = [];

    const company = new DSOCompany();
    company.id = '1';
    company.name = 'THE BRONX - Dental Center';
    company.rating = '4.1';
    company.reviews = '789';
    company.city = 'Los Angeles';
    company.state = 'CA';
    company.logo = 'assets/images/career/log1.png';

    const company2 = new DSOCompany();
    company2.id = '2';
    company2.name = 'Fresh Dent';
    company2.rating = '5';
    company2.reviews = '119';
    company2.city = 'Los Angeles';
    company2.state = 'CA';
    company2.logo = 'assets/images/career/log2.png';

    this.companies.push(company);
    this.companies.push(company2);
  }

  ngOnInit() {
  }

}
