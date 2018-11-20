import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { UniteService } from '../../../services/unite.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-issue-menu',
  templateUrl: './issue-menu.component.html',
  styleUrls: ['./issue-menu.component.scss']
})
export class IssueMenuComponent implements OnInit {

  @Input() issueId: string;

  date: string;
  categories: string[];

  posts: Post[];

  constructor(
    private router: Router,
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
      this.posts = posts;
      this.posts.map(post => {
        if (post.categoryName && !this.categories.find(x => x === post.categoryName)) {
          this.categories.push(post.categoryName);
        }
      });

      uniteSub.unsubscribe();
    });
  }

  onUniteDetail(id: string) {
    this.router.navigate([`/unite/detail/${this.issueId}/${id}`]);
  }
}
