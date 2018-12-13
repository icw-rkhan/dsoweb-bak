import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';

import { Job } from '../../../models/job.model';
import { JobService } from '../../../services/job.service';

@Component({
  selector: 'dso-career-job-jobs',
  templateUrl: './career-job.component.html',
  styleUrls: ['./career-job.component.scss']
})
export class CareerJobComponent implements OnInit {

  jobs: Job[];
  savedJobs: Job[];

  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private jobService: JobService) {
    this.jobs = [];
    this.savedJobs = [];

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
    this.savedJobs.push(job2);
  }

  ngOnInit() {
  }

}
