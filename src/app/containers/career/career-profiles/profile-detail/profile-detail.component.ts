import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DSOCompany } from '../../../../models/dso-company.model';
import { Job } from '../../../../models/job.model';
import { JobService } from '../../../../services/job.service';
import { CompanyService } from '../../../../services/company.service';
import { Review } from '../../../../models/reivew.model';

@Component({
  selector: 'dso-career-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerProfileDetailComponent implements OnInit {

  company: DSOCompany;
  allReviews: Review[];
  reviews: Review[];
  jobs: Job[];

  rating: number;
  loadMoreBtn: string;

  rateList = [{state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}];

  constructor(
    private router: Router,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private jobService: JobService,
    private companyService: CompanyService) {
      this.rating = 0;
      this.loadMoreBtn = 'See more';
    }

  ngOnInit() {
    this.progress.start();
    this.route.params.subscribe(params => {
      const id = params['id'];

      const subCompany = this.companyService.getCompanyById(id).subscribe(company => {
        this.company = company;

        this.rating = Math.round(parseFloat(company.rating));

        subCompany.unsubscribe();

        const body = {
          'dsoId': id,
          'skip': 0,
          'limit': 0
        };

        const subJob = this.jobService.jobs(body).subscribe(jobs => {
          this.jobs = jobs;

          subJob.unsubscribe();

          const subReview = this.companyService.getCommentByCompanyId(body).subscribe(reviews => {
            this.progress.complete();

            this.allReviews = reviews;

            if (this.allReviews.length > 0) {
              this.limitReviews(2);
            }

            this.cdr.markForCheck();
            subReview.unsubscribe();
          },
          err => {
            this.progress.complete();
          });
        },
        err => {
          this.progress.complete();
        });
      });
    });
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

  getPercentRecommend() {
    if (this.allReviews && this.allReviews.length > 0) {
      let recommendCnt = 0;

      this.allReviews.map(review => {
        if (review.isRecommend) {
          recommendCnt++;
        }
      });

      const rec = (recommendCnt / this.allReviews.length) * 100;

      return rec.toFixed(1);
    } else {
      return 0;
    }
  }

  getPercentApprove() {
    if (this.allReviews && this.allReviews.length > 0) {
      let approveCnt = 0;

      this.allReviews.map(review => {
        if (review.isApprove) {
          approveCnt++;
        }
      });

      const appr = (approveCnt / this.allReviews.length) * 100;

      return appr.toFixed(1);
    } else {
      return 0;
    }
  }

  onGoToAddReview(id: string) {
    this.router.navigate([`/career/review/add/${id}`]);
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

  ratingFormat(rating: string) {
    if (rating) {
      return parseFloat(rating).toFixed(1);
    } else {
      return '';
    }
  }
}
