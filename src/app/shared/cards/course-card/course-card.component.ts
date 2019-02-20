import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/models/course.model';

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

  constructor() {
    this.rate = 0;
  }

  ngOnInit() {
    if (this.course.rating) {
      this.rate = parseInt(this.course.rating, 10);
    }
  }

}
