import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgProgress } from '@ngx-progressbar/core';
import { formatDate } from '@angular/common';

import { AuthService, ProfileService } from '../../../services/index';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'dso-reviews-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  rate: number;
  postId: number;
  comment: string;
  userId: string;
  postTitle: string;
  postDate: string;
  condition: boolean;
  res: any;
  body: any;
  userInfo: any;
  articleInfo: any;
  profileSub: any;

  rateList = [{state: false}, {state: false}, {state: false}, {state: false}, {state: false}];

  constructor(public breakpointObserver: BreakpointObserver, private progress: NgProgress,
    private commentService: CommentService, private authService: AuthService,
    private profileService: ProfileService, private _location: Location, private route: ActivatedRoute) {
      // init variables
      this.rate = 0;
      this.comment = '';
      this.condition = false;
      // gets userInfo from user's email
      this.getUserInfo(this.authService.getUserInfo().user_name);
    }

  ngOnInit() {
    // responsive layout
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      if (result.matches) {
        document.getElementById('contents').style.height = '36.5vh';
      } else {
        document.getElementById('contents').style.height = 'calc(100vh - 411px)';
      }
    });

    this.route.params.subscribe(params => {
      this.progress.start();
      // gets post's id, title, created date from the params of the route and view them
      this.postId = params['id'];
      this.postTitle = params['title'];
      this.postDate = params['date'];
      this.progress.complete();
    });
  }

  ngOnDestroy(): void {
    
  }
  // gets userInfo from user's email
  getUserInfo(email: string) {
    this.profileSub = this.profileService.findOneByEmail({ email: email }).subscribe(
      (data: any) => {
        const res = data.resultMap.data;
        // sets userInfo
        this.userId = res.id;

        this.userInfo = {
          url: res.photo_url,
          name: res.full_name
        };

        return data.resultMap.data;
      }
    );
  }
  // make a rating point
  eventRating(i) {
    this.rate = i + 1;
  }
  // save the comment and redirect to previous url
  saveComment() {
    this.body = {
      'userId': this.userId,
      'postId': this.postId,
      'comment': this.comment,
      'rating': this.rate
    };
    const commentSub = this.commentService.setComment(this.body).subscribe(
      (data: any) => {
        console.log(data);

        commentSub.unsubscribe();
        
        this._location.back();
      });
  }
  dateFormat(date) {
    return formatDate(date, 'MMMM y', 'en-US');
  }
}