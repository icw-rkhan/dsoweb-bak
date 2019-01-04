import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';

import { DSOCompany } from '../../../../models/dso-company.model';
import { Job } from '../../../../models/job.model';
import { JobService } from '../../../../services/job.service';
import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'dso-career-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerProfileDetailComponent implements OnInit {

  company: DSOCompany;
  jobs: Job[];

  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private jobService: JobService,
    private companyService: CompanyService) {}

  ngOnInit() {
    this.progress.start();
    this.route.params.subscribe(params => {
      const id = params['id'];

      const subCompany = this.companyService.getCompanyById(id).subscribe(company => {
        this.company = company;

        subCompany.unsubscribe();

        const body = {
          'dsoId': id,
          'skip': 0,
          'limit': 0
        };

        const subJob = this.jobService.jobs(body).subscribe(jobs => {
          this.progress.complete();
          this.jobs = jobs;

          this.cdr.markForCheck();

          subJob.unsubscribe();
        },
        err => {
          this.progress.complete();
        });
      });
    });
  }

}
