import { formatDate } from '@angular/common';

import { Serializable } from './serializable.model';

import * as _ from 'lodash';

export class Comment implements Serializable<Comment> {

  userId: string;
  postId: string;
  comment: string;
  rating: number;
  userName: string;
  userUrl?: string;
  creationDt: string;

  // change the format of the data
  dateFormat(date): any {
    if (date) {
      return formatDate(date, 'd MMM, y', 'en-US');
    }

    return '';
  }

  deserialize(data: any): Comment {

    return <Comment>Object.assign({}, {
      userId: data.email,
      postId: data.comment_id,
      comment: data.comment_text,
      rating: data.comment_rating,
      userName: this.userName ? this.userName : '',
      userUrl: this.userUrl ? this.userUrl : '',
      creationDt: this.dateFormat(new Date(data.create_time)),
    });
  }

}
