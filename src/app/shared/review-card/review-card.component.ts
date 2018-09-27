import { Component, Input } from '@angular/core';
import { formatDate } from '@angular/common';

import { Comment } from '../../models/comment.model';

@Component({
  selector: 'dso-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewComponent {

  @Input() comment: Comment;

  constructor() {
  }

  dateFormat(date) {
    return formatDate(date.split(' ')[0], 'd MMM, y', 'en-US');
  }
}
