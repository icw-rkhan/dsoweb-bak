import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,
  ViewChild, ElementRef, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { MapsAPILoader } from '@agm/core';
import * as _ from 'lodash';

import { Job } from '../../../models/job.model';
import { JobService } from '../../../services/job.service';
import { forkJoin, Subscription } from 'rxjs';

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
  isLoadingMore: boolean;
  showGotoTopBtn: boolean;

  public latitude: number;
  public longitude: number;
  public zoom: number;

  jobs: Job[];

  subRoute: Subscription;

  constructor(
    private ngZone: NgZone,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private jobService: JobService,
    private mapsAPILoader: MapsAPILoader) {
      this.page = 0;
      this.isLoadingMore = false;
      this.showGotoTopBtn = false;

      this.subRoute = this.route.params.subscribe(params => {
        this.type = params['type'];
      });
  }

  ngOnInit() {
    if (this.type !== 'criteria') {
      this.loadContents();
    }
  }

  ngOnDestroy() {
    this.progress.complete();

    this.subRoute.unsubscribe();
  }

  ngAfterViewInit() {
    if (this.locationElementRef) {
      // load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        const autocomplete = new google.maps.places.Autocomplete(this.locationElementRef.nativeElement, {
          types: ['geocode'],
          componentRestrictions: {country: 'us'}
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
    this.isLoadingMore = false;

    this.loadContents();
  }

  loadContents() {
    this.progress.start();

    const body = {
      'searchValue': this.term ? this.term : null,
      'location': this.location ? [this.latitude, this.longitude] : null,
      'distance': this.distance ? this.distance : null,
      'skip': this.page * 10,
      'limit': 10
    };

    const jobService = this.jobService.jobs(body);

    const subJob = forkJoin(
      jobService,
      this.jobService.bookmarkedJobs({'skip': 0, 'limit': 0})
    ).pipe(
      map(items => items[0].map(j => {
        const bookmark = items[1].find(a => a.id === j.id);

        return Object.assign({}, j, {
          savedId: bookmark ? bookmark.savedId : null
        });
      }))
    ).subscribe(jobs => {
      this.progress.complete();

      if (this.jobs && this.isLoadingMore) {
        this.jobs = [
          ...this.jobs,
          ...jobs
        ];
      } else {
        this.jobs = jobs;
      }

      this.sortJobs();

      this.cdr.markForCheck();
      subJob.unsubscribe();
    },
    err => {
      this.progress.complete();
    });
  }

  sortJobs() {
    const paidJobs = [];
    const commonJobs = [];
    this.jobs.map(job => {
      if (job.paid || job.isSponsor) {
        paidJobs.push(job);
      } else {
        commonJobs.push(job);
      }
    });

    paidJobs.sort((a: Job, b: Job) => {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

    commonJobs.sort((a: Job, b: Job) => {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

    this.jobs = [
      ...paidJobs,
      ...commonJobs
    ];
  }

  onLoadMore() {
    ++this.page;

    this.isLoadingMore = true;
    this.loadContents();
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
    this.term = '';
    this.location = '';
    this.distance = '';
  }

  clearLocation() {
    this.locationElementRef.nativeElement.value = '';
  }
}
