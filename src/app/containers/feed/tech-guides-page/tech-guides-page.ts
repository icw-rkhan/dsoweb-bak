import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Observable } from 'rxjs';

import { Post } from '../../../models/post.model';

@Component({
  templateUrl: './tech-guides-page.html',
  styleUrls: ['./tech-guides-page.scss']
})
export class TechGuidesPageComponent implements OnInit {

  posts: Observable<Post[]>;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.posts = this.postService.getPostbyCategory(4);
  }

}
