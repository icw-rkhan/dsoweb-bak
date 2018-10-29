import { Serializable } from './serializable.model';

import { ProfileService } from '../services/profile.service';

import * as _ from 'lodash';

export class Comment implements Serializable<Comment> {

  userId: string;
  postId: string;
  comment: string;
  rating: number;
  userName: string;
  userUrl?: string;

  constructor(private profileService: ProfileService) {

  }

  getUserInfo(email) {
    let res: any;
    const profileSub = this.profileService.findOneByEmail({ email: email }).subscribe(
      (data: any) => {
        res = data.resultMap.data;

        this.userId = res.id;
        this.userName = res.full_name;
        this.userUrl = res.photo_url;

        profileSub.unsubscribe();
      });

    return true;
  }

  deserialize(data: any): Comment {
    this.getUserInfo(data.email);

    return <Comment>Object.assign({}, {
      userId: this.userId ? this.userId : '',
      postId: data.comment_id,
      comment: data.comment_text,
      rating: data.comment_rating,
      userName: this.userName ? this.userName : '',
      userUrl: this.userUrl ? this.userUrl : ''
    });
  }

}
