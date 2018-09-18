import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-bookmark-grid',
  templateUrl: './bookmark-grid.component.html',
  styleUrls: ['./bookmark-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkGridComponent {

  @Input() posts: Post[] = [];
  @Output() remove = new EventEmitter<Post>();

  gridOptions: NgxMasonryOptions = {
    percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: '.gutter-sizer',
    horizontalOrder: true
  };

  onRemove(post: Post): void {
    this.remove.emit(post);
  }

}
