import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute } from '@angular/router';

import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../models/comment.model';

@Component({
  selector: 'dso-reviews-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  postId: number;
  paramsSub: any;

  comments: Comment[];

  constructor(
    public breakpointObserver: BreakpointObserver,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private progress: NgProgress) { }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.progress.start();
      this.postId = params['id'];

      const commentSub = this.commentService.comments(this.postId).subscribe((data) => {
        this.comments = data;

        commentSub.unsubscribe();
        this.progress.complete();
      },
      err => {
        this.progress.complete();
        commentSub.unsubscribe();
      });
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
