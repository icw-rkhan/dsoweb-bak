import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
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
export class ViewComponent implements OnInit, OnDestroy {
  postId: number;
  paramsSub: any;
  comments$: Observable<Comment[]>;

  rateList = [{state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}];

  constructor(public breakpointObserver: BreakpointObserver,
    private commentService: CommentService, private progress: NgProgress, private route: ActivatedRoute) { }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      if (result.matches) {
      }
    });

    this.paramsSub = this.route.params.subscribe(params => {
      this.progress.start();
      this.postId = params['id'];

      this.comments$ = this.commentService.comments(this.postId);
      const commentsSub = this.comments$.subscribe(() => {
        this.progress.complete();
        commentsSub.unsubscribe();
      });
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  dateFormat(date) {
    return formatDate(date, 'd MMM, y', 'en-US');
  }
}
