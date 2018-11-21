import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';

import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';
import { UniteService } from 'src/app/services/unite.service';

@Component({
  selector: 'dso-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.scss']
})
export class SearchMenuComponent implements OnInit, OnDestroy {
  @Input() issueId: string;
  @Output() closeSearchPanel: EventEmitter<any> = new EventEmitter();

  term: string;
  posts: Post[];
  searchTyping$: Subject<any> = new Subject<any>();
  searchTypingSub: Subscription = new Subscription();

  constructor(
    private router: Router,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private uniteService: UniteService) { }

  ngOnInit() {
    this.searchTypingSub = this.searchTyping$.pipe(
      debounceTime(300)
    ).subscribe(res => {
      this.onSearch(res);
    });
  }

  onSearch(searchValue) {
    this.progress.start();
    this.posts = [];
    this.uniteService.search(this.issueId, searchValue).subscribe(posts => {
      this.posts = posts;
      this.progress.complete();
    },
    err => {
      this.progress.complete();
    });
  }

  onUniteDetail(id: string) {
    if (id) {
      this.closeSearchPanel.emit(true);
      this.router.navigate([`/unite/detail/${this.issueId}/${id}`]);
    }
  }

  ngOnDestroy() {
    this.searchTypingSub.unsubscribe();
  }
}
