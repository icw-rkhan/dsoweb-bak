import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Job } from '../../../models/job.model';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobCardComponent implements OnInit {

  @Input()job: Job;

  days: string;

  constructor(private router: Router) {
    this.days = '6d';
  }

  ngOnInit() {
  }

  onGoToDetail() {
    this.router.navigate([`/career/detail/${this.job.id}`]);
  }
}
