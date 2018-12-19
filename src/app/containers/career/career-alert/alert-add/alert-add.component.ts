import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';

import { JobAlertService } from '../../../../services/job-alert.service';

@Component({
  selector: 'dso-career-alert-add',
  templateUrl: './alert-add.component.html',
  styleUrls: ['./alert-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertAddComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;

  id: string;
  keyword: string;
  location: string;
  distance: string;
  frequency: string;
  status: boolean;

  frequencyArr = [
    {
      'title': 'Daily',
      'value': 0
    },
    {
      'title': 'Weekly',
      'value': 1
    },
    {
      'title': 'Bi-Weekly',
      'value': 2
    },
    {
      'title': 'Monthly',
      'value': 3
    }
  ];

  constructor(
    private _location: Location,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private jobAlertService: JobAlertService) {
    this.keyword = '';
    this.location = '';
    this.distance = '50 miles';
    this.frequency = 'Weekly';

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    if (this.id) {
      this.progress.start();

      this.jobAlertService.jobAlert(this.id).subscribe(alert => {
        this.progress.complete();

        this.keyword = alert.keyword;
        this.location = alert.location;
        this.distance = `${alert.distance} miles`;
        this.status = alert.status;

        this.frequencyArr.map(fre => {
          if (fre.value === alert.frequency) {
            this.frequency = fre.title;
          }
        });

        this.cdr.markForCheck();
      },
      err => {
        this.progress.complete();
      });
    }
  }

  onSave() {
    let freq = 0;

    this.frequencyArr.map(fre => {
      if (fre.title === this.frequency) {
        freq = fre.value;
      }
    });

    if (this.id) {
      const body = {
        'id': this.id,
        'keyword': this.keyword,
        'location': this.location,
        'frequency': freq,
        'status': this.status,
        'distance': parseInt(this.distance, 10)
      };

      this.jobAlertService.editAlert(body).subscribe((res: any) => {
        if (res.code === 0) {
          this._location.back();
        }
      },
      err => {
        console.log(err);
      });
    } else {
      const body = {
        'keyword': this.keyword,
        'location': this.location,
        'frequency': freq,
        'status': true,
        'distance': parseInt(this.distance, 10)
      };

      this.jobAlertService.addAlert(body).subscribe((res: any) => {
        if (res.code === 0) {
          this._location.back();
        }
      },
      err => {
        console.log(err);
      });
    }
  }
}
