/// <reference types="@types/googlemaps" />
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,
          ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
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
export class AlertAddComponent implements OnInit, AfterViewInit {

  @ViewChild('location') locationElementRef: ElementRef;

  id: string;
  userId: string;
  keyword: string;
  location: string;
  distance: string;
  frequency: string;
  status: boolean;

  public latitude: number;
  public longitude: number;
  public zoom: number;

  frequencyArr = [
    {
      'title': 'Daily',
      'value': 1
    },
    {
      'title': 'Weekly',
      'value': 2
    },
    {
      'title': 'Bi-Weekly',
      'value': 3
    },
    {
      'title': 'Monthly',
      'value': 4
    }
  ];

  constructor(
    private ngZone: NgZone,
    private _location: Location,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private mapsAPILoader: MapsAPILoader,
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
        this.userId = alert.userId;

        this.frequencyArr.map(fre => {
          if (fre.value === alert.frequency) {
            this.frequency = fre.title;
          }
        });

        this.locationElementRef.nativeElement.value = this.location;

        this.cdr.markForCheck();
      },
      err => {
        this.progress.complete();
      });
    }
  }

  ngAfterViewInit() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.locationElementRef.nativeElement, {
        types: ['geocode']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.location = place.name;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 8;
        });
      });
    });
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
        'position': [
          this.latitude, this.longitude
        ],
        'userId': this.userId,
        'frequency': freq,
        'status': this.status,
        'distance': parseInt(this.distance, 10)
      };

      this.jobAlertService.editAlert(body).subscribe((res: any) => {
        console.log(res);
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
        'position': [
          this.latitude, this.longitude
        ],
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
