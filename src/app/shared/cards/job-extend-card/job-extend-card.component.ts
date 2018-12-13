import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../models/job.model';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-job-extend-card',
  templateUrl: './job-extend-card.component.html',
  styleUrls: ['./job-extend-card.component.scss']
})
export class JobExtendCardComponent implements OnInit {

  @Input()job: Job;

  days: string;
  companyDesc: string;
  companyLocation: string;

  constructor(private router: Router) {
    this.days = '6d';
    this.companyLocation = 'London';
    this.companyDesc = 'We are seeking general dentists who are interested in practing in an academic setting and offer perfect services';
  }

  ngOnInit() {
  }

  onGoToDetail() {
    this.router.navigate([`/career/detail/${this.job.id}`]);
  }
}
