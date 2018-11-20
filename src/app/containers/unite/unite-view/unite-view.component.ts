import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UniteService } from '../../../services/unite.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-unite-view',
  templateUrl: './unite-view.component.html',
  styleUrls: ['./unite-view.component.scss']
})
export class UniteViewComponent implements OnInit {

  id: string;
  coverPage: Post;
  posts: Post[];

  constructor(
    private router: Router,
    private location: Location,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private uniteService: UniteService) {
      this.coverPage = new Post();
      this.coverPage.title = 'cover';
      this.coverPage.thumbnail = 'assets/images/unite/cover-page.png';
    }

  ngOnInit() {
    this.progress.start();
    this.route.params.subscribe(params => {
      this.id = params['id'];

      const uniteSub = this.uniteService.findOneById(this.id).subscribe(posts => {
        this.posts = posts;

        this.progress.complete();
        uniteSub.unsubscribe();
      },
      err => {
        this.progress.complete();
        uniteSub.unsubscribe();
      });
    });
  }

  onNormalScreen() {
    this.router.navigate([`/unite/thumbnail/${this.id}`]);
  }

  onBackPage() {
    this.location.back();
  }
}
