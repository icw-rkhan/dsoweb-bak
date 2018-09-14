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
  @Output() bookmark = new EventEmitter<Bookmark>();

  gridOptions: NgxMasonryOptions = {
    transitionDuration: '0.8s',
    percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: '.gutter-sizer',
    horizontalOrder: true
  };

  onBookmark(item: Bookmark) {
    this.bookmark.emit(item);
  }

}
