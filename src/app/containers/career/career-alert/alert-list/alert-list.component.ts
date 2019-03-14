import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { Router } from '@angular/router';

import { Alert } from '../../../../models/alert.model';
import { JobAlertService } from '../../../../services/job-alert.service';

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

    const subAlert = this.jobAlertService.jobAlerts(body).subscribe(alerts => {
      this.progress.complete();

      this.alerts = alerts;

      this.cdr.markForCheck();
      subAlert.unsubscribe();
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
          'userId': alert.userId,
          'frequency': alert.frequency,
          'status': alert.status
        };

        const subAlert = this.jobAlertService.editAlert(body).subscribe(res => {
          this.progress.complete();

          subAlert.unsubscribe();
        });
      }
    });
  }

  removeAlert(id: string) {
    this.progress.start();

    const subAlert = this.jobAlertService.deleteAlert(id).subscribe((res: any) => {
      this.progress.complete();

      if (res.code === 0) {
        this.removeItem(id);
      }

      subAlert.unsubscribe();
    },
    err => {
      this.progress.complete();
    });
  }

  removeItem(id: string) {
    this.alerts = this.alerts.filter(alert => alert.id !== id);
    this.cdr.markForCheck();
  }
}
