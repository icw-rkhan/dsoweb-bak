import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';

import { Job } from '../../../models/job.model';
import { JobService } from '../../../services/job.service';

@Component({
  selector: 'dso-career-search',
  templateUrl: './career-search.component.html',
  styleUrls: ['./career-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerSearchComponent implements OnInit, OnDestroy {

  term: string;
  type: string;
  page: number;
  distance: string;
  location: string;
  showGotoTopBtn: boolean;

  jobs: Job[];

  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private jobService: JobService) {
      this.page = 0;
      this.showGotoTopBtn = false;

      this.route.params.subscribe(params => {
        this.type = params['type'];
      });
  }

  ngOnInit() {
    if (this.type !== 'criteria') {
      this.onSearch();
    }
  }

  ngOnDestroy() {
    this.progress.complete();
  }

  onSearch() {
    this.progress.start();

    const body = {
      'searchValue': this.term ? this.term : null,
      'location': this.location ? this.location : null,
      'distance': this.distance ? this.distance : null,
      'skip': this.page * 10,
      'limit': 10
    };

    this.jobService.jobs(body).subscribe(jobs => {
      this.progress.complete();

      this.clear();

      if (this.jobs) {
        this.jobs = [
          ...this.jobs,
          ...jobs
        ];
      } else {
        this.jobs = jobs;
      }

      this.cdr.markForCheck();
    },
    err => {
      console.log(err);
      this.progress.complete();
    });
  }

  onLoadMore() {
    ++this.page;

    this.onSearch();
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

  clear() {
    this.page = 0;
    this.term = '';
    this.location = '';
    this.distance = '';
  }
}
