import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,
  ViewChild, ElementRef, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { MapsAPILoader } from '@agm/core';
import * as _ from 'lodash';

import { Job } from '../../../models/job.model';
import { JobService } from '../../../services/job.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'dso-career-search',
  templateUrl: './career-search.component.html',
  styleUrls: ['./career-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerSearchComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('location2') locationElementRef: ElementRef;

  term: string;
  type: string;
  page: number;
  distance: string;
  location: string;
  showGotoTopBtn: boolean;

  public latitude: number;
  public longitude: number;
  public zoom: number;

  jobs: Job[];

  constructor(
    private ngZone: NgZone,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private jobService: JobService,
    private mapsAPILoader: MapsAPILoader) {
      this.page = 0;
      this.showGotoTopBtn = false;

      // set google maps defaults
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      this.route.params.subscribe(params => {
        this.type = params['type'];
      });
  }

  ngOnInit() {
    if (this.type !== 'criteria') {
      this.onSearch();
    }
  }

  ngOnDestroy() {
    this.progress.complete();
  }

  ngAfterViewInit() {
    if (this.locationElementRef) {
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
            this.zoom = 12;
          });
        });
      });
    }
  }

  onSearch() {
    this.progress.start();

    const body = {
      'searchValue': this.term ? this.term : null,
      'location': this.location ? [this.latitude, this.longitude] : null,
      'distance': this.distance ? this.distance : null,
      'skip': this.page * 10,
      'limit': 10
    };

    const jobService = this.jobService.jobs(body);

    forkJoin(
      jobService,
      this.jobService.bookmarkedJobs({'skip': this.page * 10, 'limit': 10})
    ).pipe(
      map(items => items[0].map(j => {
        const bookmark = items[1].find(a => a.id === j.id);

        return Object.assign({}, j, {
          savedId: bookmark ? bookmark.savedId : null
        });
      }))
    ).subscribe(jobs => {
      this.progress.complete();

      this.clear();

      if (this.jobs) {
        this.jobs = [
          ...this.jobs,
          ...jobs
        ];
      } else {
        this.jobs = jobs;
      }

      this.cdr.markForCheck();
    },
    err => {
      console.log(err);
      this.progress.complete();
    });
  }

  onLoadMore() {
    ++this.page;

    this.onSearch();
  }

  onScroll(event) {
    const scrollPosition = event.srcElement.scrollTop;
    if (scrollPosition > 200) {
      this.showGotoTopBtn = true;
    } else {
      this.showGotoTopBtn = false;
    }
  }

  gotoTop() {
    document.getElementById('contents').scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  clear() {
    this.page = 0;
    this.term = '';
    this.location = '';
    this.distance = '';
  }

  clearLocation() {
    this.locationElementRef.nativeElement.value = '';
  }
}
