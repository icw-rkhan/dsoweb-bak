import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selector: 'dso-detail-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit, OnDestroy {
  post: Post;
  rate: number;
  postId: number;
  paramsSub: Subscription;
  review_count: number;
  comments: Comment[];
  rateList = [{status: 'inactive'}, {status: 'inactive'},
  {status: 'inactive'}, {status: 'inactive'}, {status: 'inactive'}];

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService,
    private authService: AuthService, private progress: NgProgress, private commentService: CommentService,
    private bookmarkService: BookmarkService, private snackBar: MatSnackBar) {
    this.review_count = 0;
    this.rate = 0;
    this.post = new Post();
  }
  // gets the postId from article page and gets the postInfo and the commentInfo with postId from server
  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      this.progress.start();
      this.postId = params['id'];
      const postSub = this.postService.fetchById(this.postId).subscribe(p => {
        this.post = p;
        const commentSub = this.commentService.comments(this.postId).subscribe(c => {
          this.comments = c;
          commentSub.unsubscribe();
        });
        postSub.unsubscribe();
        this.progress.complete();
      });
    });
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

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
  // remove *
  resetCategoryName(category: string) {
    return category.substring(category.indexOf('*') + 1);
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
  // post sponsor article by postId
  onPostSponsor(type) {
    let sponsorId: number;
    if (type === 'gsk') {
      sponsorId = 197;
    } else if (type === 'align') {
      sponsorId = 260;
    } else if (type === 'nobel') {
      sponsorId = 259;
    }
    this.router.navigate([`/posts/sponsor/${sponsorId}`]);
  }
  // get average rating of the comments by postId
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
  // check gsk tag
  isGsk(tags): boolean {
    if (tags && tags.includes(197)) {
      return true;
    }
    return false;
  }
  // check align tag
  isAlign(tags): boolean {
    if (tags && tags.includes(260)) {
      return true;
    }
    return false;
  }
  // check nobel tag
  isNobel(tags): boolean {
    if (tags && tags.includes(259)) {
      return true;
    }
    return false;
  }
}
