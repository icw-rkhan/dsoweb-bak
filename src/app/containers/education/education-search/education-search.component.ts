import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { map } from 'rxjs/internal/operators';
import { forkJoin } from 'rxjs';
import * as _ from 'lodash';

import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'dso-education-search',
  templateUrl: './education-search.component.html',
  styleUrls: ['./education-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationSearchComponent implements OnInit {

  term: string;
  pageNum: number;
  validCancel: boolean;

  courses: Course[];

  constructor(
    private progress: NgProgress,
    private cdr: ChangeDetectorRef,
    private courseService: CourseService) {
      this.pageNum = 1;
      this.validCancel = false;
    }

  ngOnInit() {
    // this.makeTestData();
  }

  onSearch() {
    this.courses = [];

    const body = {
      pgnumber: this.pageNum,
      pgsize: 0,
      searchValue: this.term
    };

    this.progress.start();
    const courseService = this.courseService.searchCourses(body);

    // Join bookmarks and posts
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

      this.courses = courses;

      this.cdr.markForCheck();

      courseSub.unsubscribe();
    },
    err => {
      this.progress.complete();
    });
  }

  onCancel() {
    this.clear();
  }

  onChange() {
    if (this.term.trim() !== '') {
      this.validCancel = true;
    } else {
      this.validCancel = false;
    }

    this.cdr.markForCheck();
  }

  makeTestData() {
    this.courses = [];

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

  clear() {
    this.term = '';
    this.courses = null;
    this.validCancel = false;

    this.progress.complete();
  }
}
