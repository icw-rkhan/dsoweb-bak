import { Component, OnInit } from '@angular/core';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'dso-career-search',
  templateUrl: './career-search.component.html',
  styleUrls: ['./career-search.component.scss']
})
export class CareerSearchComponent implements OnInit {

  jobs: Job[];

  constructor() {
    this.jobs = [];

    const job = new Job();
    job.jobTitle = 'Title of the job';
    job.companyName = 'Heartland Dental';
    job.salary = '$100k - $150k';
    job.log = 'assets/images/career/log1.png';
    job.isAttention = false;

    const job2 = new Job();
    job2.jobTitle = 'Title of the job';
    job2.companyName = 'Dental Services';
    job2.salary = '$125k - $145k';
    job2.log = 'assets/images/career/log2.png';
    job2.isAttention = true;

    this.jobs.push(job);
    this.jobs.push(job2);
  }

  ngOnInit() {
  }

}
