import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';

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

  @Output() addBookmark = new EventEmitter<Bookmark>();
  @Output() removeBookmark = new EventEmitter<string>();

  constructor() {
    this.noFoundMessage = 'No items found';
  }

  onAddBookmark(item: Bookmark) {
    this.addBookmark.emit(item);
  }

  onRemoveBookmark(id: string) {
    this.removeBookmark.emit(id);
  }

}
