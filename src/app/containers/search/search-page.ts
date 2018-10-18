import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  templateUrl: './search-page.html',
  styleUrls: ['./search-page.scss'],
})
export class SearchPageComponent implements OnInit {

  posts: Post[];
  term: string;

  constructor(private postService: PostService, private progress: NgProgress) {
  }

  ngOnInit(): void {
  }

  onSearch() {
    this.progress.start();
    this.postService.search(this.term).subscribe(posts => {
      this.posts = posts;
      this.progress.complete();
    },
    err => {
      this.progress.complete();
    });
  }
}
