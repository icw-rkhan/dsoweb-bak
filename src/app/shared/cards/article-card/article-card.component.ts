import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent implements OnInit {

  isAD: boolean;
  submitTitle: string;

  @Input() isBookmark: boolean;
  @Input() issueId: string;
  @Input() article: Post;

  @Output() removeBookmark = new EventEmitter<string>();

  constructor(private router: Router) {
    this.isAD = false;
  }

  ngOnInit() {
    const title = this.article.title;

    if (title.length > 2 && title.substr(0, 2) === 'AD') {
      this.isAD = true;
    } else {
      this.isAD = false;
    }

    if (this.article.authorName) {
      this.article.authorName = `by ${this.article.authorName}`;
    }
  }

  onUniteDetail(id: string) {
    if (id) {
      this.router.navigate([`/unite/detail/${this.issueId}/${id}`]);
    }
  }

  onRemoveBookmark(id: string) {
    this.removeBookmark.emit(id);
  }

  isNullThumbnail(url: string) {
    if (url) {
      if (url.includes('objectId=null')) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
