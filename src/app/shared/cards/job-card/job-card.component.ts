import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Job } from '../../../models/job.model';
import { JobService } from '../../../services/job.service';

@Component({
  selector: 'dso-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobCardComponent implements OnInit {

  @Input()job: Job;

  days: string;
  dayBetween: number;
  isBookmark: boolean;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private jobService: JobService) {
    this.days = '0d';
    this.isBookmark = false;
  }

  ngOnInit() {
    this.dayBetween = this.daysBetween(new Date(this.job.publishDate), new Date(new Date().toDateString()));
    if (this.dayBetween === 0) {
      this.days = 'Today';
    } else {
      this.days = `${this.dayBetween.toString()}d`;
    }
  }

  daysBetween( date1: Date, date2: Date ) {
    // Get 1 day in milliseconds
    const one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    const difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.abs(Math.round(difference_ms / one_day));
  }

  onGoToDetail() {
    if (!this.isBookmark) {
      this.router.navigate([`/career/detail/${this.job.id}`]);
    } else {
      this.isBookmark = false;
    }
  }

  onBookmark() {
    this.isBookmark = true;
    if (!this.job.isSaved) {
      const subJob = this.jobService.addBookmark(this.job.id).subscribe((res: any) => {
        if (res.code === 0) {
          this.job.isSaved = true;
          this.cdr.markForCheck();
        }

        subJob.unsubscribe();
      });
    } else {
      const subJob = this.jobService.deleteBookmark(this.job.savedId).subscribe((res: any) => {
        if (res.code === 0) {
          this.job.isSaved = false;
          this.cdr.markForCheck();
        }

        subJob.unsubscribe();
      });
    }
  }
}
