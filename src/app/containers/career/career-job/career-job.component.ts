import { Component, OnInit } from '@angular/core';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'dso-career-job-jobs',
  templateUrl: './career-job.component.html',
  styleUrls: ['./career-job.component.scss']
})
export class CareerJobComponent implements OnInit {

  jobs: Job[];
  savedJobs: Job[];

  constructor() {
    this.jobs = [];
    this.savedJobs = [];

    const job = new Job();
    job.jobId = '1';
    job.jobTitle = 'Title of the job';
    job.companyName = 'Heartland Dental';
    job.salary = '$100k - $150k';
    job.log = 'assets/images/career/log1.png';
    job.isSaved = false;
    job.isAttention = false;

    const job2 = new Job();
    job2.jobId = '2';
    job2.jobTitle = 'Title of the job';
    job2.companyName = 'Dental Services';
    job2.salary = '$125k - $145k';
    job2.log = 'assets/images/career/log2.png';
    job2.isSaved = true;
    job2.isAttention = false;

    this.jobs.push(job);
    this.savedJobs.push(job2);
  }

  ngOnInit() {
  }

}