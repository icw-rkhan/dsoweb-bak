import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Bookmark } from '../../../models/bookmark.model';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'dso-bookmark-grid',
  templateUrl: './bookmark-grid.component.html',
  styleUrls: ['./bookmark-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkGridComponent {

  @Input() bookmarks: Bookmark[] = [];
  @Output() remove = new EventEmitter<Bookmark>();

  gridOptions: NgxMasonryOptions = {
    transitionDuration: '0.8s',
    percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: '.gutter-sizer',
    horizontalOrder: true
  };

  onRemove(bookmark: Bookmark): void {
    this.remove.emit(bookmark);
  }

}
