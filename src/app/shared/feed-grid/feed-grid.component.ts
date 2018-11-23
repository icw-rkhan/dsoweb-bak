import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Post } from '../../models/post.model';
import { Bookmark } from '../../models/bookmark.model';

@Component({
  selector: 'dso-feed-grid',
  templateUrl: './feed-grid.component.html',
  styleUrls: ['./feed-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedGridComponent {
  @Input() noFoundMessage: string;
  @Input() sponsorId: number;
  @Input() posts: Post[];
  @Input() loading: boolean;

  @Output() addBookmark = new EventEmitter<Bookmark>();
  @Output() removeBookmark = new EventEmitter<string>();
  @Output() loadMore = new EventEmitter();

  private page: number;
  showGotoTopBtn = false;

  constructor() {
    this.noFoundMessage = 'No items found';
    this.page = 0;
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
