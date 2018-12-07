import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'dso-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit {

  @Input()job: Job;

  days: string;

  constructor() {
    this.days = '6d';
  }

  ngOnInit() {
  }

}
