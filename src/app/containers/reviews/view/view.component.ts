import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';

import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../models/comment.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'dso-reviews-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  postId: number;
  comments$: Observable<Comment[]>;
  commentsSub: Subscription;
  routeParams: any;

  stateList = [{state:'inactive'},{state:'inactive'},{state:'inactive'},{state:'inactive'},{state:'inactive'}]

  constructor(public breakpointObserver: BreakpointObserver, 
    private commentService: CommentService, private progress: NgProgress, private activeRoute: ActivatedRoute) { 
  }

  ngOnInit() 
  {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape
    ]).subscribe(result=> {
      if(result.matches) {
      }
    })

    this.routeParams = this.activeRoute.snapshot.params;
    this.postId = 28;//this.routeParams.postId;

    this.progress.start();
    this.comments$ = this.commentService.comments(this.postId);
    this.commentsSub = this.comments$.subscribe(() => this.progress.complete());
  }

  dateFormat(date) {
    return formatDate(date, 'd MMM, y', 'en-US');
  }

  ngOnDestroy(): void {
    this.commentsSub.unsubscribe();
  }
}
