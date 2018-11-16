import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UniteService } from '../../../services/unite.service';
import { Post } from '../../../models/post.model';
import { NgProgress } from '@ngx-progressbar/core';
import { Unite } from '../../../models/unite.model';

@Component({
  selector: 'dso-unite-thumbnail',
  templateUrl: './unite-thumbnail.component.html',
  styleUrls: ['./unite-thumbnail.component.scss']
})
export class UniteThumbnailComponent implements OnInit {

  issue: Unite;
  articles: Post[];

  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private uniteService: UniteService) {
      this.progress.start();

      this.route.params.subscribe(params => {
        const id = params['id'];

        const body = {
          'skip': 0,
          'limit': 0
        };

        const issueSub = this.uniteService.findAll(body).subscribe(unites => {
          const temp = [];

          unites.map(unite => {
            if (unite.id === id) {
              temp.push(unite);
            }
          });

          this.issue = temp[0];
          issueSub.unsubscribe();
        });

        const uniteSub = this.uniteService.findOneById(id).subscribe(posts => {
          this.articles = posts;

          this.progress.complete();
          uniteSub.unsubscribe();
        },
        err => {
          this.progress.complete();
          uniteSub.unsubscribe();
        });
      });
  }

  ngOnInit() {
  }

}
