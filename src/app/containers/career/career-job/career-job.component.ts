import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

import { Job } from '../../../models/job.model';
import { JobService } from '../../../services/job.service';

@Component({
  selector: 'dso-career-job-jobs',
  templateUrl: './career-job.component.html',
  styleUrls: ['./career-job.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerJobComponent implements OnInit, OnDestroy {

  applyPage: number;
  savePage: number;
  showGotoTopBtn1: boolean;
  showGotoTopBtn2: boolean;

  jobs: Job[];
  savedJobs: Job[];

  constructor(
    private progress: NgProgress,
    private cdr: ChangeDetectorRef,
    private jobService: JobService) {
      this.applyPage = 0;
      this.savePage = 0;

      this.showGotoTopBtn1 = false;
      this.showGotoTopBtn2 = false;
    }

  ngOnInit() {
    this.loadAppliedJobs();
    this.loadSavedJobs();
  }

  ngOnDestroy() {
    this.progress.complete();
  }

  onLoadMoreAppliedJobs() {
    this.applyPage++;

    this.loadAppliedJobs();
  }

  onLoadMoreSavedJobs() {
    this.savePage++;

    this.loadSavedJobs();
  }

  loadAppliedJobs() {
    const body = {
      'limit': 10,
      'skip': this.applyPage * 10
    };

    this.progress.start();
    const subJob = this.jobService.savedJobs(body).subscribe(jobs => {
      this.progress.complete();

      if (this.jobs) {
        this.jobs = [
          ...this.jobs,
          ...jobs
        ];
      } else {
        this.jobs = jobs;
      }

      this.cdr.markForCheck();
      subJob.unsubscribe();
    },
    err => {
      console.log(err);
      this.progress.complete();
    });
  }

  loadSavedJobs() {
    const body = {
      'limit': 10,
      'skip': this.savePage * 10
    };

    const subJob = this.jobService.bookmarkedJobs(body).subscribe(savedJobs => {
      if (this.savedJobs) {
        this.savedJobs = [
          ...this.savedJobs,
          ...savedJobs
        ];
      } else {
        this.savedJobs = savedJobs;
      }

      this.savedJobs.map(job => {
        job.isSaved = true;
      });

      this.cdr.markForCheck();
      subJob.unsubscribe();
    });
  }

  removeBookmark(bookmarkId: string) {
    let id;
    this.savedJobs.map(job => {
      if (job.savedId === bookmarkId) {
        id = job.id;
      }
    });

    this.savedJobs = this.savedJobs.filter(job => job.id !== id);
    this.cdr.markForCheck();
  }

  onScroll1(event) {
    const scrollPosition = event.srcElement.scrollTop;
    if (scrollPosition > 200) {
      this.showGotoTopBtn1 = true;
    } else {
      this.showGotoTopBtn1 = false;
    }
  }

  onScroll2(event) {
    const scrollPosition = event.srcElement.scrollTop;
    if (scrollPosition > 200) {
      this.showGotoTopBtn2 = true;
    } else {
      this.showGotoTopBtn2 = false;
    }
  }

  gotoTop1() {
    document.getElementById('appliedJobs').scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  gotoTop2() {
    document.getElementById('savedJobs').scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
