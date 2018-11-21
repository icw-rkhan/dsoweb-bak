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

  submitTitle: string;

  @Input() isBookmark: boolean;
  @Input() issueId: string;
  @Input() article: Post;

  @Output() removeBookmark = new EventEmitter<string>();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onUniteDetail(id: string) {
    if (id) {
      this.router.navigate([`/unite/detail/${this.issueId}/${id}`]);
    }
  }

  onRemoveBookmark(id: string) {
    this.removeBookmark.emit(id);
  }
}
