import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Job } from '../../../models/job.model';
import { Company } from '../../../models/company.model';
import { JobService } from '../../../services/job.service';
import { Review } from '../../../models/reivew.model';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'dso-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerDetailComponent implements OnInit, OnDestroy {

  id: string;
  rating: string;
  loadMoreBtn: string;

  job: Job;
  reviews: Review[];
  allReviews: Review[];

  rateList = [{state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}];

  constructor(
    private router: Router,
    private location: Location,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private jobService: JobService,
    private companyService: CompanyService) {
      this.rating = '0';
      this.loadMoreBtn = 'See more';

      this.job = new Job();
      this.reviews = [];

      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
  }

  ngOnInit() {
    this.progress.start();
    this.jobService.getJobById(this.id).subscribe(job => {
      this.job = job;

      const body = {
        'dsoId': this.job.companyId,
        'sort': 0,
        'start': 0
      };

      const subCompany = this.companyService.getCommentByCompanyId(body).subscribe(reviews => {
        this.progress.complete();

        this.allReviews = reviews;

        if (this.allReviews.length > 0) {
          this.calcRating();
        }

        this.limitReviews(2);

        this.cdr.markForCheck();
        subCompany.unsubscribe();
      },
      err => {
        this.progress.complete();
      });
    },
    err => {
      this.progress.complete();
    });
  }

  ngOnDestroy() {
    this.progress.complete();
  }

  calcRating() {
    let totalRating = 0;
    this.allReviews.map(review => {
      totalRating = totalRating + review.rating;
    });

    this.rating = (totalRating / this.allReviews.length).toFixed(1);
  }

  onGoToAddReview(id: string) {
    this.router.navigate([`/career/review/add/${id}`]);
  }

  limitReviews(count: number) {
    this.reviews = [];

    if (count !== -1) {
      let index = count;
      for (index = 0; index < 2; index++) {
        this.reviews.push(this.allReviews[index]);
      }
    } else {
      this.reviews = this.allReviews;
    }
  }

  loadMore() {
    if (this.loadMoreBtn === 'See more') {
      this.loadMoreBtn = 'See less';

      this.limitReviews(-1);
    } else {
      this.loadMoreBtn = 'See more';

      this.limitReviews(2);
    }
  }

  onBack() {
    this.location.back();
  }
}
