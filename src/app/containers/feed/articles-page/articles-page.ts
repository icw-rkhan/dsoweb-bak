import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../../models/post.model';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  templateUrl: './articles-page.html',
  styleUrls: ['./articles-page.scss']
})
export class ArticlesPageComponent implements OnInit, OnDestroy {

  posts$: Observable<Post[]>;

  private postSub: Subscription;

  constructor(private postService: PostService, private progress: NgProgress) {
  }

  ngOnInit(): void {
    this.progress.start();
    this.posts$ = this.postService.posts('standard');
    this.postSub = this.posts$.subscribe(() => this.progress.complete());
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

}
