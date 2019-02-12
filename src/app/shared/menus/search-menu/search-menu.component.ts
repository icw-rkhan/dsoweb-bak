import { Component, OnInit, OnDestroy, Input, Output, EventEmitter,
        ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgProgress } from '@ngx-progressbar/core';

import { Post } from '../../../models/post.model';
import { UniteService } from 'src/app/services/unite.service';

@Component({
  selector: 'dso-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    private cdr: ChangeDetectorRef,
    private uniteService: UniteService) { }

  ngOnInit() {
    this.searchTypingSub = this.searchTyping$.pipe(
      debounceTime(300)
    ).subscribe(res => {
      this.onSearch(res);

      this.searchTypingSub.unsubscribe();
    });
  }

  onSearch(searchValue) {
    this.progress.start();
    this.posts = [];
    const subUnite = this.uniteService.search(this.issueId, searchValue).subscribe(posts => {
      this.progress.complete();
      this.posts = posts;

      this.cdr.markForCheck();
      subUnite.unsubscribe();
    },
    err => {
      this.progress.complete();
    });
  }

  onUniteDetail(id: string) {
    if (id) {
      this.closeSearchPanel.emit(true);
      this.router.navigate([`/unite/common/detail/${this.issueId}/${id}`]);
    }
  }

  ngOnDestroy() {
    this.progress.complete();
    this.searchTypingSub.unsubscribe();
  }
}
