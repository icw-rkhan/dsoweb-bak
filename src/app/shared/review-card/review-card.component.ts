import { Component, Input } from '@angular/core';
import { formatDate } from '@angular/common';

import { environment } from '../../../environments/environment';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'dso-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewComponent {

  @Input() comment: Comment;

  baseUrl: string;

  rateList = [{state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}];

  constructor() {
    this.baseUrl = environment.profileApiUrl;
  }

  dateFormat(date) {
    return formatDate(date.split(' ')[0], 'd MMM, y', 'en-US');
  }
}
