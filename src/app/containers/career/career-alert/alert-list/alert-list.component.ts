import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Alert } from '../../../../models/alert.model';

@Component({
  selector: 'dso-career-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertListComponent implements OnInit {

  alerts: Alert[];

  constructor(private cdr: ChangeDetectorRef) {
    this.alerts = [];

    const alert = new Alert();
    alert.keyword = 'Associate Dentist';
    alert.location = 'Los Angeles';
    alert.distance = '25';
    alert.status = true;

    const alert2 = new Alert();
    alert2.keyword = 'General Dentist';
    alert2.location = 'Santa Maria';
    alert2.distance = '100';
    alert2.status = false;

    this.alerts.push(alert);
    this.alerts.push(alert2);

    this.cdr.markForCheck();
  }

  ngOnInit() {
  }

}
