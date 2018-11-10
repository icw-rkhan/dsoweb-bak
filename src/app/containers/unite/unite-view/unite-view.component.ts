import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Unite } from '../../../models/unite.model';
import { UniteService } from '../../../services/unite.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dso-unite-view',
  templateUrl: './unite-view.component.html',
  styleUrls: ['./unite-view.component.scss']
})
export class UniteViewComponent implements OnInit {

  unites: Unite[];

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private uniteService: UniteService) {
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      const tUnites = this.uniteService.makeTestDate().filter(item => item.isDownload === true);

      const index = tUnites.indexOf(tUnites.find(item => item.id === id));
      this.unites = this.arrayMove(tUnites, index, 0);
    });
  }

  onDetailUnite(id: string) {
    this.router.navigate([`/unite/detail/${id}`]);
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
