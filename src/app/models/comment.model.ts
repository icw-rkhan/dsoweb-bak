import { Serializable } from './serializable.model';
import * as _ from 'lodash';

export class Comment implements Serializable<Comment> {

  userId: string;
  postId: string;
  comment: string;
  rating: number;
  userName: string;
  userUrl: string;
  creationDt: Date;

  deserialize(data: any): Comment {
    return <Comment>Object.assign({}, {
      userId: data.userId.rendered,
      postId: data.postId.rendered,
      comment: data.comment.rendered,
      rating: data.rating.rendered,
      userName: data.userName.rendered,
      userUrl: data.userUrl.rendered,
      creationDt: new Date(data.creationDt),
    });
  }

}
