import { formatDate } from '@angular/common';

import { Serializable } from './serializable.model';

export class Bookmark implements Serializable<Bookmark> {

  id?: string;
  url?: string;
  title: string;
  email: string;
  postId: string;
  user_id?: string;
  create_time?: string;

  // change the format of the data
  dateFormat(date): any {
    if (date) {
      return formatDate(date, 'MMM d, y', 'en-US');
    }

    return '';
  }

  deserialize(data: any): Bookmark {
    return <Bookmark>Object.assign({}, {
      create_time: this.dateFormat(new Date(data.create_time)),
      email: data.email,
      id: data._id,
      title: data.title,
      postId: data.post_id
    });
  }
}
