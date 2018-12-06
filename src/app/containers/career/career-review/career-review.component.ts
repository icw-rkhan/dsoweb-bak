import { Component, OnInit } from '@angular/core';
import { CComment } from '../../../models/ccomment.model';

@Component({
  selector: 'dso-career-review',
  templateUrl: './career-review.component.html',
  styleUrls: ['./career-review.component.scss']
})
export class CareerReviewComponent implements OnInit {

  comments: CComment[];

  constructor() {
    this.comments = [];

    const comment = new CComment();
    comment.companyId = '1';
    comment.companyName = 'THE BRONX - Dental Center';
    comment.rating = '4.1';
    comment.reviews = '789';

    const comment2 = new CComment();
    comment2.companyId = '2';
    comment2.companyName = 'Fresh Dent';
    comment2.rating = '4.7';
    comment2.reviews = '119';

    this.comments.push(comment);
    this.comments.push(comment2);
  }

  ngOnInit() {
  }

}
