import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

import { Job } from '../../../models/job.model';
import { JobService } from '../../../services/job.service';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'dso-career-search',
  templateUrl: './career-search.component.html',
  styleUrls: ['./career-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerSearchComponent implements OnInit {

  jobs: Job[];

  constructor(
    private progress: NgProgress,
    private jobService: JobService,
    private companyService: CompanyService) {
    this.jobs = [];

    const job = new Job();
    job.id = '1';
    job.jobTitle = 'Title of the job';
    job.companyName = 'Heartland Dental';
    job.salaryStartingValue = '$100k';
    job.salaryEndValue = '$145k';
    job.logoURL = 'assets/images/career/log1.png';
    job.isSaved = false;
    job.isAttention = false;

    const job2 = new Job();
    job2.id = '2';
    job2.jobTitle = 'Title of the job';
    job2.companyName = 'Dental Services';
    job2.salaryStartingValue = '$100k';
    job2.salaryEndValue = '$145k';
    job2.logoURL = 'assets/images/career/log2.png';
    job2.isSaved = true;
    job2.isAttention = false;

    this.jobs.push(job);
    this.jobs.push(job2);
  }

  ngOnInit() {
  }

}
