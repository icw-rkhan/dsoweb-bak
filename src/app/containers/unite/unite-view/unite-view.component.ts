import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UniteService } from '../../../services/unite.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-unite-view',
  templateUrl: './unite-view.component.html',
  styleUrls: ['./unite-view.component.scss']
})
export class UniteViewComponent implements OnInit {

  id: string;
  posts: Post[];

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private uniteService: UniteService) {
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.uniteService.findOneById(this.id).subscribe(posts => {
        this.posts = posts;
      });
    });
  }

  onDetailUnite(id: string) {
    this.router.navigate([`/unite/detail/${this.id}/${id}`]);
  }

  onBackPage() {
    this.location.back();
  }

  arrayMove(arr: any[], fromIndex: number, toIndex: number) {
    const item = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, item);

    return arr;
  }

}
