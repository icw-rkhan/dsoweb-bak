import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dso-career-alert-add',
  templateUrl: './alert-add.component.html',
  styleUrls: ['./alert-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertAddComponent implements OnInit {

  keyword: string;
  location: string;
  distance: string;
  frequency: string;

  constructor() {
    this.keyword = '';
    this.location = '';
    this.distance = '50 miles';
    this.frequency = 'Weekly';
  }

  ngOnInit() {
  }
}
