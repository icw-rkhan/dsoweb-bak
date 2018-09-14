import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../../../models/post.model';

@Component({
  templateUrl: './interviews-page.html',
  styleUrls: ['./interviews-page.scss']
})
export class InterviewsPageComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.posts$ = this.postService.posts('interview');
  }

}
