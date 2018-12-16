import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

import { Job } from '../../../models/job.model';
import { JobService } from '../../../services/job.service';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'dso-career-search',
  templateUrl: './career-search.component.html',
  styleUrls: ['./career-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerSearchComponent implements OnInit {

  page: number;
  showGotoTopBtn: boolean;

  jobs: Job[];

  constructor(
    private progress: NgProgress,
    private cdr: ChangeDetectorRef,
    private jobService: JobService) {
      this.page = 0;
      this.showGotoTopBtn = false;

      this.jobs = [];
  }

  ngOnInit() {
    this.loadContents();
  }

  loadContents() {
    this.progress.start();

    const body = {
      'skip': this.page * 10,
      'limit': 10
    };

    this.jobService.jobs(body).subscribe(jobs => {
      this.progress.complete();

      this.jobs = jobs;

      this.cdr.markForCheck();
    },
    err => {
      this.progress.complete();
    });
  }

  onLoadMore() {
    ++this.page;

    this.loadContents();
  }

  onScroll(event) {
    const scrollPosition = event.srcElement.scrollTop;
    if (scrollPosition > 200) {
      this.showGotoTopBtn = true;
    } else {
      this.showGotoTopBtn = false;
    }
  }

  gotoTop() {
    document.getElementById('contents').scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
