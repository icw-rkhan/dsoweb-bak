import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';
import * as _ from 'lodash';

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

  @Output() addBookmark = new EventEmitter<Bookmark>();
  @Output() removeBookmark = new EventEmitter<string>();

  display: boolean;
  gridOptions: NgxMasonryOptions = {
    transitionDuration: '0.2s',
    // percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: '.gutter-sizer',
    initLayout: true,
  };

  private _posts: Post[];

  constructor(private cdr: ChangeDetectorRef) {
    this._posts = [];
    this.noFoundMessage = 'No items found';
    this.display = false;
  }

  @Input() set posts(posts: Post[]) {
    if (!_.isUndefined(posts)) {
      this._posts = posts;
      setTimeout(() => {
        this.cdr.markForCheck();
        console.log('Updating');
        this.display = true;
      }, 1000);
    }
  }

  get posts(): Post[] {
    return this._posts;
  }

  onAddBookmark(item: Bookmark) {
    this.addBookmark.emit(item);
  }

  onRemoveBookmark(id: string) {
    this.removeBookmark.emit(id);
  }

}
