import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Alert } from '../../../../models/alert.model';
import { NgProgress } from '@ngx-progressbar/core';
import { JobAlertService } from '../../../../services/job-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-career-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertListComponent implements OnInit, OnDestroy {

  alerts: Alert[];

  constructor(
    private router: Router,
    private progress: NgProgress,
    private cdr: ChangeDetectorRef,
    private jobAlertService: JobAlertService) {}

  ngOnInit() {
    this.progress.start();

    const body = {
      'limit': 10,
      'skip': 0
    };

    this.jobAlertService.jobAlerts(body).subscribe(alerts => {
      this.progress.complete();

      this.alerts = alerts;

      this.cdr.markForCheck();
    },
    err => {
      this.progress.complete();
    });
  }

  ngOnDestroy() {
    this.progress.complete();
  }

  onGoToAddAert() {
    this.router.navigate(['/career/alert/add']);
  }

  toggleAlert(id: string) {
    this.alerts.map(alert => {
      if (alert.id === id) {
        this.progress.start();

        alert.status = !alert.status;

        const body = {
          'id': alert.id,
          'keyword': alert.keyword,
          'location': alert.location,
          'distance': alert.distance,
          'frequency': alert.frequency,
          'status': alert.status
        };

        this.jobAlertService.editAlert(body).subscribe(res => {
          this.progress.complete();
        });
      }
    });
  }

  removeAlert(id: string) {
    this.progress.start();

    this.jobAlertService.deleteAlert(id).subscribe((res: any) => {
      this.progress.complete();

      if (res.code === 0) {
        this.removeItem(id);
      }
    },
    err => {
      this.progress.complete();
    });
  }

  removeItem(id: string) {
    this.alerts.map(item => {
      if (item.id === id) {
        const index = this.alerts.indexOf(item);
        this.alerts.splice(index, 1);

        this.cdr.markForCheck();
      }
    });
  }
}
