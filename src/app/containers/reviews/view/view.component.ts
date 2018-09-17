import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../models/comment.model';

@Component({
  selector: 'dso-reviews-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {


  postId: number;
  comments$: Observable<Comment[]>;

  stateList = [{state:'inactive'},{state:'inactive'},{state:'inactive'},{state:'inactive'},{state:'inactive'}]

  constructor(public breakpointObserver: BreakpointObserver, private commentService: CommentService) { 
    this.postId = 28;
  }

  ngOnInit() 
  {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape
    ]).subscribe(result=> {
      if(result.matches) {
      }
    })  

    this.comments$ = this.commentService.comments(this.postId);
  }
}
