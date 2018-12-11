import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../models/job.model';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {

  @Input()job: Job;

  days: string;

  constructor(private router: Router) {
    this.days = '6d';
  }

  ngOnInit() {
  }

  onJobDetail(id: string) {
    this.router.navigate([`/career/detail/${id}`]);
  }
}
