import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent implements OnInit {

  @Input() type: string;
  @Input() course: Course;
  @Output() removeBookmark = new EventEmitter<string>();

  rate: number;

  rateList = [
    {state: false},
    {state: false},
    {state: false},
    {state: false},
    {state: false}
  ];

  constructor(private router: Router, private courseService: CourseService) {
    this.rate = 0;
  }

  ngOnInit() {
    if (this.course.rating) {
      this.rate = parseInt(this.course.rating, 10);
    }
  }

  onPostSponsor() {
    this.router.navigate([`/education/sponsor/${this.course.sponsorId}`]);
  }

  onBookmark() {
    const courseSub = this.courseService.addBookmark(this.course.bookmarkId)
      .subscribe((res: any) => {
        if (res.resultMap.code === 0) {
          this.course.isBookmarked = true;
          this.course.bookmarkId = res.resultMap.id;
        }

        courseSub.unsubscribe();
    });
  }

  onRemoveBookmark() {
    const courseSub = this.courseService.removeBookmark(this.course.bookmarkId)
      .subscribe((res: any) => {
        if (res.resultMap.code === 0) {
          this.course.isBookmarked = false;
          this.course.bookmarkId = null;

          this.removeBookmark.emit(this.course.id);
        }

        courseSub.unsubscribe();
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
