import { ChangeDetectionStrategy, Component, EventEmitter, Input,
  Output, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
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
  selector: 'dso-detail-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SponsorComponent implements OnInit, OnDestroy, AfterViewInit {
  post: Post;
  rate: number;
  postId: number;
  paramsSub: any;
  review_count: number;
  comments: Comment[];
  postSub: any;
  commentSub: any;

  @Output() addBookmark = new EventEmitter<Bookmark>();
  @Output() removeBookmark = new EventEmitter<string>();

  rateList = [{status: 'inactive'}, {status: 'inactive'}, {status: 'inactive'}, {status: 'inactive'}, {status: 'inactive'}];
  
  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService,
    private authService: AuthService, private progress: NgProgress, private commentService: CommentService) {
    this.review_count = 0;
    this.rate = 0;
  }
  // gets the postId from article page and gets the postInfo and the commentInfo with postId from server
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.progress.start();
      this.postId = params['id'];
      this.postSub = this.postService.fetchById(this.postId).subscribe(p => {
        this.post = p;

        this.commentSub = this.commentService.comments(this.postId).subscribe(c => {
          this.comments = c;
        });

        this.progress.complete();
      });
    });
  }
 // relayout the contents gets from server
  ngAfterViewInit(): void {
    const childs = document.getElementById('contents');

    const len = childs.getElementsByTagName('p').length;
    let i = 0;
    for ( i = 0; i < len; i++) {
      childs.getElementsByTagName('p')[i].style.color = '#4a4a4a';
      childs.getElementsByTagName('p')[i].style.marginBottom = '10px';
      childs.getElementsByTagName('p')[i].style.lineHeight = '20px';
      childs.getElementsByTagName('p')[i].style.fontSize = '15px';
    }
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.commentSub.unsubscribe();
  }
  // post the page to review all comments with postId
  onViewAll(postId): void {
    this.router.navigate([`/reviews/view/${postId}`]);
  }
  // post the page to add reivew with postId
  onAddReview(postId, title, date): void {
    this.router.navigate([`/reviews/add/${postId}/${title}/${date}`]);
  }
  // add bookmark
  onAddBookmark(): void {
    this.post.bookmarked = true;
    const email = this.authService.getUserInfo().user_name;
    this.addBookmark.emit(<Bookmark>{
      email: email,
      title: this.post.title,
      postId: this.post.id.toString()
    });
  }
  // remove bookmark
  onRemoveBookmark(): void {
    this.post.bookmarked = false;
    console.log(this.post);
    this.removeBookmark.emit(this.post.bookmarkId);
  }
  // get average rating of the comments by postId
  getRating(comments, type): any {
    const len = comments.length;

    if (len === 0) {
      return 0;
    }

    let i = 0;
    let sumRating = 0;
    for ( i = 0; i < len; i++) {
      sumRating = sumRating + comments[i].rating;
    }

    const avgRating = sumRating / len;

    if (type) {
      return Math.floor(avgRating);
    }

    return avgRating.toFixed(2);
  }
  // change the format of the data
  dateFormat(date): any {
    return formatDate(date, 'MMM d, y', 'en-US');
  }
  // check gsk tag
  isGsk(tags): boolean {
    if (tags.includes(197)) {
      return true;
    }
    return false;
  }
  // check align tag
  isAlign(tags): boolean {
    if (tags.includes(260)) {
      return true;
    }
    return false;
  }
  // check nobel tag
  isNobel(tags): boolean {
    if (tags.includes(259)) {
      return true;
    }
    return false;
  }
}