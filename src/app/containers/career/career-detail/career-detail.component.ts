import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { Job } from '../../../models/job.model';
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
  rating: number;
  sharedUrl: string;
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
      this.rating = 0;
      this.loadMoreBtn = 'See more';

      this.job = new Job();
      this.reviews = [];

      this.route.params.subscribe(params => {
        this.id = params['id'];
      });

      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.sharedUrl = event.url;
        }
      });
  }

  ngOnInit() {
    this.progress.start();
    this.jobService.getJobById(this.id).subscribe(job => {
      this.job = job;

      this.rating = Math.round(parseFloat(job.rating));

      const body = {
        'dsoId': this.job.companyId,
        'sort': 0,
        'start': 0
      };

      const subCompany = this.companyService.getCommentByCompanyId(body).subscribe(reviews => {
        this.progress.complete();

        this.allReviews = reviews;

        if (this.allReviews.length > 0) {
          this.limitReviews(2);
        }

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

  onGoToAddReview(id: string) {
    this.router.navigate([`/career/review/add/${id}`]);
  }

  onSave() {
    this.progress.start();
    this.jobService.saveJob(this.job.id).subscribe((res: any) => {
      if (res.code === 0) {
        this.jobService.bookmarkedJobs({'skip': 0, 'limit': 0}).subscribe(savedJobs => {
          this.progress.complete();

          savedJobs.map(job => {
            if (job.id === this.job.id) {
              const subJob = this.jobService.deleteBookmark(job.savedId).subscribe((ress: any) => {
                if (ress.code === 0) {
                  this.job.isSaved = false;
                  this.job.isApplied = true;
                  this.cdr.markForCheck();
                }

                subJob.unsubscribe();
              });
            }
          });
        },
        err => {
          this.progress.complete();
        });
      }
    },
    err => {
      this.progress.complete();
    });
  }

  onBookmark() {
    if (!this.job.isSaved) {
      this.jobService.addBookmark(this.job.id).subscribe((res: any) => {
        if (res.code === 0) {
          this.job.isSaved = true;
          this.cdr.markForCheck();
        }
      });
    } else {
      this.jobService.bookmarkedJobs({'skip': 0, 'limit': 0}).subscribe(savedJobs => {
        savedJobs.map(job => {
          if (job.id === this.job.id) {
            const subJob = this.jobService.deleteBookmark(job.savedId).subscribe((res: any) => {
              if (res.code === 0) {
                this.job.isSaved = false;
                this.cdr.markForCheck();
              }

              subJob.unsubscribe();
            });
          }
        });
      });
    }
  }

  onGoToJobScreen() {
    this.router.navigate(['/career/search']);
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
    const rec = (parseInt(this.job.recommendNum, 10) / parseInt(this.job.reviewNum, 10)) * 100;

    return rec.toFixed(1);
  }

  getPercentApprove() {
    const appr = (parseInt(this.job.approveNum, 10) / parseInt(this.job.reviewNum, 10)) * 100;

    return appr.toFixed(1);
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

  ratingFormat(rating: string) {
    if (rating) {
      return parseFloat(rating).toFixed(1);
    } else {
      return '';
    }
  }
}
