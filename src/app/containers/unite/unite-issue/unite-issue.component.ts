import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UniteService } from '../../../services/unite.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-unite-issue',
  templateUrl: './unite-issue.component.html',
  styleUrls: ['./unite-issue.component.scss']
})
export class UniteIssueComponent implements OnInit {

  date: string;
  issueId: string;
  categories: string[];

  posts: Post[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private uniteService: UniteService) {
      this.categories = [];
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.issueId = params['id'];

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
          console.log(post);
          this.categories.push(post.categoryName);
        });

        console.log(this.categories);

        uniteSub.unsubscribe();
      });
    });
  }

  onUniteDetail(id: string) {
    this.router.navigate([`/unite/detail/${this.issueId}/${id}`]);
  }
}
