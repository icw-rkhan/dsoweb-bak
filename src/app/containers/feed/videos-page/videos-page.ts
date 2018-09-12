import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Observable } from 'rxjs';

import { Post } from '../../../models/post.model';

@Component({
  templateUrl: './videos-page.html',
  styleUrls: ['./videos-page.scss']
})
export class VideosPageComponent implements OnInit {

  posts: Observable<Post[]>;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.posts = this.postService.getPostbyCategory(4);
  }
}
