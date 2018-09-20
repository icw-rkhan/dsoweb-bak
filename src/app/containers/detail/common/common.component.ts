import {Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { formatDate } from '@angular/common';

import { PostService } from '../../../services/post.service';
import { CommentService } from '../../../services/comment.service';
import { BookmarkService } from '../../../services/bookmark.service';
import { AuthService } from '../../../services';
import { Bookmark } from '../../../models/bookmark.model';
import { Comment } from '../../../models/comment.model';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-detail-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit, OnDestroy, AfterViewInit {
  post: Post;
  rate: number;
  postId: number;
  review_count: number;
  comments: Comment[];
  postSub: any;
  commentSub: any;

  rateList = [{status: 'inactive'}, {status: 'inactive'}, {status: 'inactive'}, {status: 'inactive'}, {status: 'inactive'}];
  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService,
    private authService: AuthService, private progress: NgProgress, private commentService: CommentService,
    private bookmarkService: BookmarkService, private snackBar: MatSnackBar) {
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
      });
    });
  }
  // relayout the contents gets from server
  ngAfterViewInit(): void {
    const parentTag = document.getElementById('contents');

    this.reLayout('p', parentTag);
    this.reLayout('ul', parentTag);
    this.reLayout('ol', parentTag);

    this.progress.complete();
  }

  reLayout(childTagName, parentTag): void {
    const len = parentTag.getElementsByTagName(childTagName).length;
    let i = 0;
    for ( i = 0; i < len; i++) {
      const childTag = parentTag.getElementsByTagName(childTagName)[i];
      if (childTagName === 'img') {
        childTag.style.width = '100%';
        childTag.style.height = 'auto';
      } else if (childTagName === 'ul' || childTagName === 'ol') {
        this.reLayout('li', childTag);
      } else {
        this.reLayout('img', childTag);
        childTag.style.color = '#4a4a4a';
        childTag.style.marginBottom = '10px';
        childTag.style.lineHeight = '20px';
        childTag.style.fontSize = '15px';
      }
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

    const bookmarkSub = this.bookmarkService.saveBookmark(<Bookmark>{
      email: email,
      title: this.post.title,
      postId: this.post.id.toString(),
      url: 'http://www.dsodentist.com',
    }).subscribe(x => {
      this.snackBar.open('Bookmark added', 'OK', {
        duration: 2000,
      });
      bookmarkSub.unsubscribe();
    });
  }
  // remove bookmark
  onRemoveBookmark(): void {
    this.post.bookmarked = false;

    const bookmarkSub = this.bookmarkService.deleteOneById(this.post.bookmarkId).subscribe(x => {
      this.snackBar.open('Bookmark removed', 'OK', {
        duration: 2000,
      });
      bookmarkSub.unsubscribe();
    });
  }
  // get averave rating of the comments by postId 
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
}