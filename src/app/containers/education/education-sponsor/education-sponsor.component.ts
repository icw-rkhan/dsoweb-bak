import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import * as _ from 'lodash';

import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-education-sponsor',
  templateUrl: './education-sponsor.component.html',
  styleUrls: ['./education-sponsor.component.scss']
})
export class EducationSponsorComponent implements OnInit, OnDestroy {

  pageNum: number;
  sponsorId: string;
  showGotoTopBtn: boolean;

  routeSub: Subscription;

  courses: Course[];

  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private courseService: CourseService) {
    this.pageNum = 1;
    this.showGotoTopBtn = false;

    this.routeSub = this.route.params.subscribe(params => {
      this.sponsorId = params['sponsorId'];
    });
  }

  ngOnInit() {
    this.loadContents();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onLoadMore() {
    this.pageNum++;

    this.loadContents();
  }

  loadContents() {
    const body = {
      pgnumber: this.pageNum,
      pgsize: 5,
      sponsoredId: this.sponsorId
    };

    this.progress.start();
    const courseService = this.courseService.courses(body);

    // Join bookmarks and post
    const courseSub = forkJoin(
      courseService,
      this.courseService.bookmarks({pgnumber: 1, pgsize: 0})
    ).pipe(
      map(items => items[0].map(p => {
        const bookmark = items[1].find(b => b.courseId === p.id);

        return Object.assign({}, p, {
          isBookmark: !_.isUndefined(bookmark),
          bookmarkId: !_.isUndefined(bookmark) ? bookmark.id : undefined
        });
      }))
    ).subscribe(courses => {
      this.progress.complete();

      this.courses = [
        ...this.courses,
        ...courses
      ];

      this.cdr.markForCheck();

      courseSub.unsubscribe();
    },
    err => {
      this.progress.complete();
    });
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

  // check gsk tag
  isGsk(sponsorId): boolean {
    if (sponsorId === environment.SPONSOR_GSK) {
    return true;
    }
    return false;
  }

  // check align tag
  isAlign(sponsorId): boolean {
      if (sponsorId === environment.SPONSOR_ALIGN) {
      return true;
      }
      return false;
  }

  // check nobel tag
  isNobel(sponsorId): boolean {
      if (sponsorId === environment.SPONSOR_NOBEL) {
      return true;
      }
      return false;
  }
}
