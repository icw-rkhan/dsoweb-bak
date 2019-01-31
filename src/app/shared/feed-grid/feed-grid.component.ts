import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

import { Post } from '../../models/post.model';
import { Bookmark } from '../../models/bookmark.model';

@Component({
  selector: 'dso-feed-grid',
  templateUrl: './feed-grid.component.html',
  styleUrls: ['./feed-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedGridComponent implements OnChanges {

  @Input() posts: Post[];
  @Input() typeId: number;
  @Input() loading: boolean;
  @Input() sponsorId: number;
  @Input() noFoundMessage: string;

  @Output() addBookmark = new EventEmitter<Bookmark>();
  @Output() removeBookmark = new EventEmitter<string>();
  @Output() loadMore = new EventEmitter();

  page: number;

  showGotoTopBtn = false;

  constructor() {
    this.noFoundMessage = 'No items found';
    this.page = 0;
  }

  ngOnChanges() {
    const element = document.getElementById('article-contents');
    if (element && this.posts && this.posts.length === 5) {
      element.scroll({
        top: 0,
        left: 0
      });
    }
  }

  onAddBookmark(item: Bookmark) {
    this.addBookmark.emit(item);
  }

  onRemoveBookmark(id: string) {
    this.removeBookmark.emit(id);
  }

  onLoadMore() {
    this.loadMore.emit(++this.page);
  }

  onScroll(event) {
    const scrollPosition = event.srcElement.scrollTop;
    if (scrollPosition > 200) {
      this.showGotoTopBtn = true;
    } else {
      this.showGotoTopBtn = false;
    }
  }

  gotoTop() {
    document.getElementById('article-contents').scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
