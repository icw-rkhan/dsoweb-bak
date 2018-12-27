import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { UniteService } from '../../../services/unite.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-issue-menu',
  templateUrl: './issue-menu.component.html',
  styleUrls: ['./issue-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueMenuComponent implements OnInit, OnDestroy {

  @Input() issueId: string;
  @Output() scrollEvent = new EventEmitter();

  date: string;
  categories: string[];

  posts: Post[];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private uniteService: UniteService) {
      this.categories = [];
    }

  ngOnInit() {
    const body = {
      'skip': 0,
      'limit': 0
    };

    this.uniteService.findAll(body).subscribe(unites => {
      unites.map(unite => {
        if (unite.id === this.issueId) {
          this.date = unite.date;
        }
      });
    });

    const uniteSub = this.uniteService.findOneById(this.issueId).subscribe(posts => {
      this.posts = [];
      posts.map(post => {
        if (post.categoryName && !this.categories.find(x => x === post.categoryName)) {
          this.categories.push(post.categoryName);
        }

        if (post.title.length > 2 && post.title.substr(0, 2) !== 'AD') {
          this.posts.push(post);
        }
      });

      this.cdr.markForCheck();
      uniteSub.unsubscribe();
    });
  }

  ngOnDestroy() {
  }

  onUniteDetail(id: string) {
    this.router.navigate([`/unite/detail/${this.issueId}/${id}`]);
  }
}
