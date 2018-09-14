import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Observable } from 'rxjs';

import { Post } from '../../../models/post.model';

@Component({
  templateUrl: './latest-page.html',
  styleUrls: ['./latest-page.scss']
})
export class LatestPageComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.posts$ = this.postService.posts();
  }

}
