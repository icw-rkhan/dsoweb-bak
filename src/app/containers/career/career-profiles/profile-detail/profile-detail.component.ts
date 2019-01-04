import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { CompanyService } from '../../../../services/company.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../../../models/company.model';
import { Job } from '../../../../models/job.model';
import { JobService } from '../../../../services/job.service';

@Component({
  selector: 'dso-career-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerProfileDetailComponent implements OnInit {

  company: any;
  jobs: Job[];

  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private jobService: JobService,
    private companyService: CompanyService) {
      this.company = {
        'name': 'THE BRONX - Dental Center',
        'logoUrl': 'assets/images/career/log1.png',
        'address1': '301-399 S Highland Ave',
        'address2': 'Los Angeles, CA 90036',
        'description': 'Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisee..'
      };
    }

  ngOnInit() {
    // this.progress.start();

    this.route.params.subscribe(params => {
      const id = params['id'];
    });
  }

}
