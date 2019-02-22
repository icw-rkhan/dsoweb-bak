import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'dso-education-sponsor',
  templateUrl: './education-sponsor.component.html',
  styleUrls: ['./education-sponsor.component.scss']
})
export class EducationSponsorComponent implements OnInit, OnDestroy {

  sponsorId: string;
  routeSub: Subscription;

  courses: Course[];

  constructor(private route: ActivatedRoute) {
    this.routeSub = this.route.params.subscribe(params => {
      this.sponsorId = params['sponsorId'];
    });
  }

  ngOnInit() {
    this.courses = [];
    const course = new Course();
    course.id = '1';
    course.title = 'Purpose Driven Dental Assisting';
    course.logoUrl = 'assets/images/education/course_logo.png';
    course.presenter = 'Dr.Anna Smith';
    course.rating = '4';
    course.level = 'beginner';
    course.duration = '3h 20m';
    course.sponsorId = '197';
    course.cost = '19.50';

    const course2 = new Course();
    course2.id = '2';
    course2.title = 'Modern Dental Extractions - Fast, Painless, & Non-invasive';
    course2.logoUrl = 'assets/images/education/course_logo.png';
    course2.presenter = 'Dr.Anna Smith';
    course2.rating = '4';
    course2.level = 'Intermediate';
    course2.duration = '3h 20m';
    course2.cost = null;
    course2.isBookmarked = true;

    this.courses.push(course);
    this.courses.push(course2);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
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
