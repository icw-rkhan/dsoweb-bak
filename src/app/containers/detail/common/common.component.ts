import {Component, OnInit, OnDestroy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';

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
export class CommonComponent implements OnInit, OnDestroy {
  post: Post;
  rate: number;
  postId: number;
  authorName: string;
  authorInfo: string;
  review_count: number;
  comments: Comment[];
  paramsSub: Subscription;

  rateList = [
    {status: 'inactive'},
    {status: 'inactive'},
    {status: 'inactive'},
    {status: 'inactive'},
    {status: 'inactive'}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private authService: AuthService,
    private progress: NgProgress,
    private commentService: CommentService,
    private bookmarkService: BookmarkService,
    private snackBar: MatSnackBar) {

    this.rate = 0;
    this.review_count = 0;
    this.post = new Post();
  }

  // gets the postId from article page and gets the postInfo and the commentInfo with postId from server
  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      this.progress.start();
      this.postId = params['id'];

      const commentSub = this.commentService.comments(this.postId).subscribe(c => {
        this.comments = c;

        commentSub.unsubscribe();
      });

      const postSub = this.postService.fetchById(this.postId).subscribe(p => {
        this.post = p;

        this.progress.complete();
        postSub.unsubscribe();
      });
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  // custome the style of the content
  reLayout(tagName): void {
    const paretTag = document.getElementById('contents');
    const tag = paretTag.getElementsByTagName(tagName);
    if (tag && tag.length > 0) {

      let i = 0;
      for (i = 0; i < tag.length; i++) {
        if (tagName === 'video') {

          tag[i].style.backgroundColor = 'black';
        }

        tag[i].style.width = '100%';
        tag[i].style.height = 'auto';
      }
    }
  }

  // fetch an author/speaker's name
  fetchAuthorInfo() {
    const parentTag = document.getElementById('tLoad');
    const tag = parentTag.getElementsByTagName('p');
    const videoTag = parentTag.getElementsByTagName('video');

    if (tag && tag.length > 0) {
      let authorTag;
      if (videoTag && videoTag.length > 0 && !tag[0].innerHTML.includes('(')) {
        authorTag = tag[1].innerHTML;
      } else {
        authorTag = tag[0].innerHTML;
      }

      if (authorTag.includes('strong')) {
        authorTag = authorTag.replace('<strong>', '');
        authorTag = authorTag.replace('</strong>', '');
      }

      const authorArr = authorTag.split('<br>');
      let authorName = authorArr.length > 0 ? authorArr[0] : null;
      let authorInfo = authorArr.length > 1 ? authorArr[1] : null;

      if (authorName.includes('(') && authorName.includes(')')) {
        if (authorName.includes('By')) {
          authorName = authorName.replace('By', '');
        }

        authorName = authorName.replace('(', '');
        authorName = authorName.replace(')', '');

        this.authorName = authorName;

        this.activeAuthorLayout();
      }

      if (authorInfo && authorInfo.includes('[') && authorInfo.includes(']')) {

        authorInfo = authorInfo.replace('[', '');
        authorInfo = authorInfo.replace(']', '');

        this.authorInfo = authorInfo;
      }
    }
  }

  // remove author's info
  removeAuthorInfo() {
    const parentTag = document.getElementById('contents');
    const tag = parentTag.getElementsByTagName('p');
    const videoTag = parentTag.getElementsByTagName('video');

    if (tag && tag.length > 0) {
      if (videoTag && videoTag.length > 0 &&
        !tag[0].innerHTML.includes('(') &&
         tag[1].innerHTML.includes('(')) {
        tag[1].innerHTML = '';
      } else if (tag[0].innerHTML.includes('(')) {
        tag[0].innerHTML = '';
      }
    }
  }

  activeAuthorLayout() {
    document.getElementById('container').style.height = '58px';
    document.getElementById('container').style.borderTop = '1px solid #e9edf1';
    document.getElementById('container').style.borderBottom = '1px solid #e9edf1';
    document.getElementById('container').style.padding = '12px 10px';

    document.getElementById('author-info').style.marginTop = '8px';
  }

  // filter categories
  filterCategories(categories) {
    if (categories && categories.length > 1) {
      return categories[1].name;
    } else if (categories && categories.length === 1) {
      return categories[0].name;
    }

    return '';
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
    if (!comments) {
      return 0;
    }

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

    return avgRating.toFixed(1);
  }

  // change the format of the data
  dateFormat(date): any {
    if (date) {
      return formatDate(date, 'MMM d, y', 'en-US');
    }

    return '';
  }
}
