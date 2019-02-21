import { Component, OnInit, Input } from '@angular/core';

import { Course } from 'src/app/models/course.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;

  rate: number;

  rateList = [
    {state: false},
    {state: false},
    {state: false},
    {state: false},
    {state: false}
  ];

  constructor(private router: Router) {
    this.rate = 0;
  }

  ngOnInit() {
    if (this.course.rating) {
      this.rate = parseInt(this.course.rating, 10);
    }
  }

  onPostSponsor() {
    // this.router.navigate([]);
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
