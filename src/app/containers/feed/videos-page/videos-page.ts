import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../../models/post.model';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  templateUrl: './videos-page.html',
  styleUrls: ['./videos-page.scss']
})
export class VideosPageComponent implements OnInit, OnDestroy {

  posts$: Observable<Post[]>;

  private postSub: Subscription;

  constructor(private postService: PostService, private progress: NgProgress) {
  }

  ngOnInit(): void {
    this.progress.start();
    this.posts$ = this.postService.posts('video');
    this.postSub = this.posts$.subscribe(() => this.progress.complete());
  }


  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

}
