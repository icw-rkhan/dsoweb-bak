import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';

import { Post } from '../../models/post.model';
import { Bookmark } from '../../models/bookmark.model';

@Component({
  selector: 'dso-feed-grid',
  templateUrl: './feed-grid.component.html',
  styleUrls: ['./feed-grid.component.scss']
})
export class FeedGridComponent {

  @Input() posts: Post[];
  @Output() addBookmark = new EventEmitter<Bookmark>();
  @Output() removeBookmark = new EventEmitter<string>();

  gridOptions: NgxMasonryOptions = {
    percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: '.gutter-sizer',
    horizontalOrder: true
  };

  onAddBookmark(item: Bookmark) {
    this.addBookmark.emit(item);
  }

  onRemoveBookmark(id: string) {
    this.removeBookmark.emit(id);
  }

}
