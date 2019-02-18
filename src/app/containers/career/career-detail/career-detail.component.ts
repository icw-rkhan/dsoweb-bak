import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { HttpResponse } from '@angular/common/http';
import { NgProgress } from '@ngx-progressbar/core';
import { MatMenuTrigger } from '@angular/material';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { Job } from '../../../models/job.model';
import { Review } from '../../../models/reivew.model';
import { JobService } from '../../../services/job.service';
import { CompanyService } from '../../../services/company.service';
import { AuthService, ProfileService } from '../../../services';
import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'dso-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  id: string;
  tab: string;
  type: number;
  rating: number;
  isFixed: boolean;
  userProfile: any;
  sharedUrl: string;
  loadMoreBtn: string;

  job: Job;
  reviews: Review[];
  allReviews: Review[];

  subRoute: Subscription;
  subRoute2: Subscription;

  dialog_types = [
    {id: 0, title: 'upload'},
    {id: 1, title: 'submit'},
    {id: 2, title: 'complete'}
  ];

  rateList = [{state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}];

  @ViewChild('tabs') tabs: ElementRef;
  @ViewChild('ctrlBtns') ctrlBtns: ElementRef;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(
    private router: Router,
    private location: Location,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private jobService: JobService,
    private authService: AuthService,
    private alertService: AlertService,
    private profileService: ProfileService,
    private sharingService: SharingService,
    private companyService: CompanyService) {
      this.type = -1;
      this.rating = 0;
      this.isFixed = false;
      this.tab = 'tab1';
      this.loadMoreBtn = 'See more';

      this.job = new Job();
      this.reviews = [];

      this.subRoute = this.route.params.subscribe(params => {
        this.id = params['id'];
      });

      this.subRoute2 = this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.sharedUrl = event.url;
        }
      });
  }

  ngOnInit() {
    this.progress.start();
    const subJob = this.jobService.getJobById(this.id).subscribe(job => {
      this.job = job;

      this.checkJobType();

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

      subJob.unsubscribe();
    },
    err => {
      this.progress.complete();
    });
  }

  ngOnDestroy() {
    this.progress.complete();

    this.subRoute.unsubscribe();
    this.subRoute2.unsubscribe();
  }

  ngAfterViewInit() {
    const device = this.sharingService.getMyDevice();
    if (device === 'desktop') {
      const element = this.ctrlBtns.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
    }
  }

  @HostListener('window:scroll', [])
  onscroll() {
    this.trigger.closeMenu();
  }

  onTab(tabId: string) {
    this.tab = tabId;

    window.scrollTo(0, 0);

    const tabs = document.getElementsByClassName('tab-content');
    tabs[0].scrollTo(0, 0);
    tabs[1].scrollTo(0, 0);
    tabs[2].scrollTo(0, 0);
  }

  onGoToAddReview(id: string) {
    this.router.navigate([`/career/review/add/${id}`]);
  }

  onSave() {
    const email = this.authService.getUserInfo().user_name;
    const subProfile = this.profileService.findOneByEmail({email : email}).subscribe(res => {
      this.userProfile = res.resultMap.data;

      if (this.userProfile.document_library) {
        this.progress.start();

        this.type = this.dialog_types[1].id;
        this.cdr.markForCheck();

        setTimeout(() => {
          this.saveJob();
        }, 1500);
      } else {
        this.type = this.dialog_types[0].id;

        this.cdr.markForCheck();
      }

      subProfile.unsubscribe();
    });
  }

  checkJobType() {
    const type = this.job.type;

    if (type.toLocaleLowerCase() === 'parttime') {
      this.job.type = 'part-time';
    }
  }

  selectFile(file) {
    this.progress.start();
    this.type = this.dialog_types[1].id;

    const subPro = this.profileService.uploadResume(file.srcElement.files[0]).subscribe((event: any) => {
      if (event instanceof HttpResponse) {
        const res = event.body;

        if (res['code'] === 0) {
          this.userProfile.document_library = {
            document_name: res['resultMap']['resumeName']
          };

          const subProfile = this.profileService.saveProfile(this.userProfile).subscribe((res2: any) => {
            if (res2.code === 0) {
              this.saveJob();
            }

            subProfile.unsubscribe();
          },
          err => {
            this.handleError(err);
          });
        } else {
          this.progress.complete();
          this.type = -1;
          this.cdr.markForCheck();

          this.alertService.errorAlert('Upload Failed');
        }

        subPro.unsubscribe();
      }
    },
    err => {
      this.handleError(err);
    });
  }

  saveJob() {
    const subJob1 = this.jobService.saveJob(this.job.id).subscribe((res: any) => {
      if (res.code === 0) {
        const subJob2 = this.jobService.bookmarkedJobs({'skip': 0, 'limit': 0}).subscribe(savedJobs => {
          this.progress.complete();

          savedJobs.map(job => {
            if (job.id === this.job.id) {
              const subJob3 = this.jobService.deleteBookmark(job.savedId).subscribe((ress: any) => {
                subJob3.unsubscribe();
              },
              err => {
                this.handleError(err);
              });
            }
          });

          this.job.isSaved = false;
          this.job.isApplied = true;

          this.type = this.dialog_types[2].id;
          this.cdr.markForCheck();

          setTimeout(() => {
            this.type = -1;
            this.cdr.markForCheck();
          }, 1500);

          subJob2.unsubscribe();
        },
        err => {
          this.handleError(err);
        });
      }

      subJob1.unsubscribe();
    },
    err => {
      this.handleError(err);
    });
  }

  handleError(err: string) {
    console.log(err);

    this.progress.complete();
    this.type = this.dialog_types[2].id;

    setTimeout(() => {
      this.type  = -1;
    }, 1500);
  }

  onBookmark() {
    if (!this.job.isSaved) {
      const subJob = this.jobService.addBookmark(this.job.id).subscribe((res: any) => {
        if (res.code === 0) {
          this.job.isSaved = true;
          this.cdr.markForCheck();
        }

        subJob.unsubscribe();
      });
    } else {
      const subJob = this.jobService.bookmarkedJobs({'skip': 0, 'limit': 0}).subscribe(savedJobs => {
        savedJobs.map(job => {
          if (job.id === this.job.id) {
            const subJob2 = this.jobService.deleteBookmark(job.savedId).subscribe((res: any) => {
              if (res.code === 0) {
                this.job.isSaved = false;
                this.cdr.markForCheck();
              }

              subJob2.unsubscribe();
            });
          }
        });

        subJob.unsubscribe();
      });
    }
  }

  onGoToMap() {
    if (this.job && this.job.position) {
      this.router.navigate([`/career/map/${this.job.position[0]}/${this.job.position[1]}`]);
    }
  }

  onGoToJobScreen() {
    this.router.navigate(['/career/search']);
  }

  limitReviews(count: number) {
    this.reviews = [];

    if (count !== -1) {
      let index = count;

      if (this.allReviews.length === 1) {
        this.reviews.push(this.allReviews[0]);
      } else {
        for (index = 0; index < 2; index++) {
          this.reviews.push(this.allReviews[index]);
        }
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

  onClearDialog() {
    this.type = -1;
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
