import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

import { PostService } from '../../../services/post.service';
import { CommentService } from '../../../services/comment.service';
import { AuthService } from '../../../services';
import { Bookmark } from '../../../models/bookmark.model';
import { Comment } from '../../../models/comment.model';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-detail-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonComponent implements OnInit, OnDestroy {

  post$: any;
  rate: number;
  postId: number;
  paramsSub: any;
  review_count: number;
  comments$: Comment[];

  @Output() addBookmark = new EventEmitter<Bookmark>();
  @Output() removeBookmark = new EventEmitter<string>();

  rateList = [{status: 'inactive'}, {status: 'inactive'}, {status: 'inactive'}, {status: 'inactive'}, {status: 'inactive'}];
  
  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService,
    private authService: AuthService, private progress: NgProgress, private commentService: CommentService) {
    this.review_count = 0;
    this.rate = 0;
  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.progress.start();
      this.postId = params['id'];
      
      const postSub = this.postService.fetchById(this.postId).subscribe(p => {
        this.post$ = p;

        const commentSub = this.commentService.comments(this.postId).subscribe(c => {
          this.comments$ = c;

          commentSub.unsubscribe();
        });

        this.progress.complete();
        postSub.unsubscribe();
      });
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  onViewAll(postId) {
    this.router.navigate([`/reviews/view/${postId}`]);
  }

  onAddReview(postId, title, date) {
    this.router.navigate([`/reviews/add/${postId}/${title}/${date}`]);
  }

  onAddBookmark() {
    this.post$.bookmarked = true;
    const email = this.authService.getUserInfo().user_name;
    this.addBookmark.emit(<Bookmark>{
      email: email,
      title: this.post$.title,
      postId: this.post$.id.toString()
    });
  }

  onRemoveBookmark() {
    this.post$.bookmarked = false;
    console.log(this.post$);
    this.removeBookmark.emit(this.post$.bookmarkId);
  }

  dateFormat(date) {
    return formatDate(date, 'MMM d, y', 'en-US');
  }
}