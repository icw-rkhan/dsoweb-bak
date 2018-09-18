import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { AuthService, ProfileService } from '../../../services/index';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'dso-reviews-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  rate: number;
  comment: string;
  user_id: string;
  condition: boolean;
  res: any;
  body: any;
  userInfo: any;
  articleInfo: any;
  routeParams: any;
  profileSub: any;

  stateList = [{state:false},{state:false},{state:false},{state:false},{state:false}]

  constructor(public breakpointObserver: BreakpointObserver, 
    private commentService: CommentService,
    private authService: AuthService,
    private profileService: ProfileService,
    private _location: Location,
    private activeRoute: ActivatedRoute) {
      this.rate = 0;
      this.comment = "";
      this.condition = false;

      this.routeParams = this.activeRoute.snapshot.params;
      this.getUserInfo(this.authService.getUserInfo().user_name);
    }

  ngOnInit() 
  {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape
    ]).subscribe(result=> {
      if(result.matches) {
        document.getElementById('contents').style.height = "36.5vh";
      }else {
        document.getElementById('contents').style.height = "calc(100vh - 411px)";
      }
    })

    this.articleInfo = {
      title: this.routeParams.postTitle,
      date: this.routeParams.postDate
    }
  }

  getUserInfo(email: string) {

    this.profileSub = this.profileService.findOneByEmail({ email: email }).subscribe(
      (data: any) => {
        const res = data.resultMap.data;

        this.user_id = res.id;

        this.userInfo = {
          url: res.photo_url,
          name: res.full_name
        }

        return data.resultMap.data;
      }
    );
  }

  eventRating(event) {
    status = event.target.getAttribute('class');

    if(status.includes('inactive') && this.rate < 5) {
      this.rate++;
    }else if(this.rate > 0) {
      this.rate--;
    }
  }

  saveComment() {
    this.body = {
      'userId': this.user_id,
      'postId': this.routeParams.postId,
      'comment': this.comment,
      'rating': this.rate
    }

    console.log(this.body);

    this.commentService.setComment(this.body);
        
    this._location.back();
  }

  ngOnDestroy(): void {
    this.profileSub.unsubscribe();
  }
}