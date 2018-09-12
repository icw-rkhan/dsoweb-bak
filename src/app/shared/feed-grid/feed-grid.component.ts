import { Component, Input } from '@angular/core';
import { NgxMasonryOptions } from 'ngx-masonry';

import { Post } from '../../models/post.model';

@Component({
  selector: 'dso-feed-grid',
  templateUrl: './feed-grid.component.html',
  styleUrls: ['./feed-grid.component.scss']
})
export class FeedGridComponent {

  @Input() posts: Post[];

  gridOptions: NgxMasonryOptions = {
    transitionDuration: '0.8s',
    percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: '.gutter-sizer',
    horizontalOrder: true
  };

}
