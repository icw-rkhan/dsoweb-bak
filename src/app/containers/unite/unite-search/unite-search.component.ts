import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';

import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';


@Component({
  selector: 'dso-unite-search',
  templateUrl: './unite-search.component.html',
  styleUrls: ['./unite-search.component.scss']
})
export class UniteSearchComponent implements OnInit, OnDestroy {

  term: string;
  issueId: string;
  posts: Post[];
  searchTyping$: Subject<any> = new Subject<any>();
  searchTypingSub: Subscription = new Subscription();

  constructor(
    private router: Router,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private postService: PostService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.issueId = params['id'];
    });

    this.searchTypingSub = this.searchTyping$.pipe(
      debounceTime(300)
    ).subscribe(res => {
      this.onSearch(res);
    });
  }

  onSearch(searchValue) {
    this.progress.start();
    this.posts = [];

    const body = {
      'searchValue': searchValue,
      'united': true,
      'skip': 0,
      'limit': 10
    };

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

  ngOnDestroy() {
    this.searchTypingSub.unsubscribe();
  }
}
