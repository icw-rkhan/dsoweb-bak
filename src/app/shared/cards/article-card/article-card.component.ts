import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../../../models/post.model';
import { SharingService } from 'src/app/services/sharing.service';

import { environment } from 'src/environments/environment';

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

  @ViewChild('card') card: ElementRef;

  constructor(private router: Router, private sharingService: SharingService) {
    this.isAD = false;
  }

  ngOnInit() {
    const title = this.article.title;

    if (title.length > 2 && title.substr(0, 2) === 'AD') {
      this.isAD = true;
    } else {
      this.isAD = false;
    }

    const device = this.sharingService.getMyDevice();
    if (device === 'desktop') {
      const element = this.card.nativeElement;
      element.style.width = `${parseInt(environment.fixedWidth, 10) * 0.7}px`;
    }
  }

  onUniteDetail(id: string) {
    if (id) {
      if (this.isBookmark) {
        this.router.navigate([`/unite/bookmark/detail/${this.issueId}/${id}`]);
      } else {
        this.router.navigate([`/unite/thumbnail/detail/${this.issueId}/${id}`]);
      }
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
