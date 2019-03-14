import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { map } from 'rxjs/internal/operators';
import { forkJoin } from 'rxjs';
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
    this.loadContents();
  }

  loadContents() {
    const body = {
      pgnumber: 1,
      pgsize: 0
    };

    this.progress.start();
    const courseService = this.courseService.courses(body);

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

  onRemoveBookmark(id: string) {
    this.courses = this.courses.filter(course => course.id !== id);
  }
}
