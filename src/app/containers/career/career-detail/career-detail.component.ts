import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Job } from '../../../models/job.model';
import { Company } from '../../../models/company.model';
import { JobService } from '../../../services/job.service';

@Component({
  selector: 'dso-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.scss']
})
export class CareerDetailComponent implements OnInit {

  job: Job;
  rating: number;
  company: Company;

  rateList = [{state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}];

  constructor(
    private router: Router,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private jobService: JobService) {

      this.route.params.subscribe(params => {
        const id = params['id'];
      });

    this.job = new Job();
    this.job.jobTitle = 'Associate Dentist - Rochester,';
    this.job.companyName = 'ADMI-Supported Practice';
    this.job.salary = '$125-$145k';

    this.company = new Company();
    this.company.companyId = '1';
    this.company.rating = '4.3';
    this.company.reviews = '374';
    this.company.location = '301-399 S Highland Ave Los Angeles, CA 90036';
  }

  ngOnInit() {
    this.rating = Math.round(parseInt(this.company.rating, 10));
  }

  onGoToAddReview(id: string) {
    this.router.navigate([`/career/review/add/${id}`]);
  }
}
