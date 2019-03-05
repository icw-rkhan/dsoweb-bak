import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import * as _ from 'lodash';

import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'dso-education-bookmarks',
  templateUrl: './education-bookmarks.component.html',
  styleUrls: ['./education-bookmarks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationBookmarksComponent implements OnInit {

  courses: Course[];

  constructor(
    private progress: NgProgress,
    private cdr: ChangeDetectorRef,
    private courseService: CourseService) {
      this.courses = [];
    }

  ngOnInit() {
    // this.loadContents();
    this.makeTestData();
  }

  loadContents() {
    const body = {
      pgnumber: 1,
      pgsize: 0
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

      courses.map(course => {
        if (course.isBookmark) {
          this.courses.push(course);
        }
      });

      this.cdr.markForCheck();

      courseSub.unsubscribe();
    },
    err => {
      this.progress.complete();
    });
  }

  makeTestData() {
    const course = new Course();
    course.id = '1';
    course.title = 'Purpose Driven Dental Assisting';
    course.logoUrl = 'assets/images/education/course_logo.png';
    course.presenter = 'Dr.Anna Smith';
    course.rating = '4';
    course.level = 'beginner';
    course.duration = '3h 20m';
    course.cost = '19.50';
    course.isBookmarked = true;

    const course2 = new Course();
    course2.id = '2';
    course2.title = 'Modern Dental Extractions - Fast, Painless, & Non-invasive';
    course2.logoUrl = 'assets/images/education/course_logo.png';
    course2.presenter = 'Dr.Anna Smith';
    course2.rating = '4';
    course2.level = 'intermediate';
    course2.duration = '3h 20m';
    course2.cost = null;
    course2.isBookmarked = true;

    this.courses.push(course);
    this.courses.push(course2);
  }

}
