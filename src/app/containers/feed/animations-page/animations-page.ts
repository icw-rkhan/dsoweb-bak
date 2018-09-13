import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../../../models/post.model';

@Component({
  templateUrl: './animations-page.html',
  styleUrls: ['./animations-page.scss']
})
export class AnimationsPageComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.posts$ = this.postService.posts('animation');
  }

}
