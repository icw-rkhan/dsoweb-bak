import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { Comment } from '../../../models/comment.model';
import { ProfileService } from '../../../services';

@Component({
  selector: 'dso-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewComponent implements OnInit {

  @Input() comment: Comment;

  baseUrl: string;

  rateList = [{state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}];

  constructor(private profileService: ProfileService, private cdr: ChangeDetectorRef) {
    this.baseUrl = environment.profileApiUrl;
  }

  ngOnInit() {
    const profileSub = this.profileService.findOneByEmail({ email: this.comment.userId }).subscribe(res => {
      const user = res.resultMap.data;

      if (user) {
        this.comment.userId = user.id;
        this.comment.userName = user.full_name;
        this.comment.userUrl = user.photo_url;
      }

      this.cdr.detectChanges();
      profileSub.unsubscribe();
    });
  }
}
