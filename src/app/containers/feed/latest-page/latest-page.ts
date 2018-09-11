import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Observable } from 'rxjs';
import { NgxMasonryOptions } from 'ngx-masonry';

import { Post } from '../../../models/post.model';

@Component({
  templateUrl: './latest-page.html',
  styleUrls: ['./latest-page.scss']
})
export class LatestPageComponent implements OnInit {

  posts: Observable<Post[]>;
  gridOptions: NgxMasonryOptions = {
    transitionDuration: '0.8s',
    percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    gutter: '.gutter-sizer',
    horizontalOrder: true
  };

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.posts = this.postService.posts();
  }

}
