import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';

import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-unite-search',
  templateUrl: './unite-search.component.html',
  styleUrls: ['./unite-search.component.scss']
})
export class UniteSearchComponent implements OnInit {

  term: string;
  issueId: string;

  posts: Post[];

  constructor(
    private router: Router,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private postService: PostService) { }

  ngOnInit() {
  }

  onSearch() {
    this.progress.start();
    this.posts = [];

    const body = {
      'searchValue': this.term,
      'united': true,
      'skip': 0,
      'limit': 10
    };

    this.route.params.subscribe(params => {
      this.issueId = params['id'];
    });

    this.postService.search(body).subscribe(posts => {
      this.posts = posts;
      this.progress.complete();
    },
    err => {
      this.progress.complete();
    });
  }

  onUniteDetail(id: string) {
    if (id) {
      this.router.navigate([`/unite/detail/${this.issueId}/${id}`]);
    }
  }

}
