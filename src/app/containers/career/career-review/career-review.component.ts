import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company.model';

@Component({
  selector: 'dso-career-review',
  templateUrl: './career-review.component.html',
  styleUrls: ['./career-review.component.scss']
})
export class CareerReviewComponent implements OnInit {

  comments: Company[];

  constructor() {
    this.comments = [];

    const comment = new Company();
    comment.companyId = '1';
    comment.companyName = 'THE BRONX - Dental Center';
    comment.rating = '4.1';
    comment.reviews = '789';

    const comment2 = new Company();
    comment2.companyId = '2';
    comment2.companyName = 'Fresh Dent';
    comment2.rating = '5';
    comment2.reviews = '119';

    this.comments.push(comment);
    this.comments.push(comment2);
  }

  ngOnInit() {
  }

}
