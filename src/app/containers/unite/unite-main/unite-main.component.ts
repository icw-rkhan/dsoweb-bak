import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { Unite } from '../../../models/unite.model';
import { UniteService } from '../../../services/unite.service';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'dso-unite-main',
  templateUrl: './unite-main.component.html',
  styleUrls: ['./unite-main.component.scss']
})
export class UniteMainComponent implements OnInit {

  page: number;
  unites: Unite[];

  constructor(
    private router: Router,
    private progress: NgProgress,
    private uniteService: UniteService) {
      this.page = 0;

      this.progress.start();
      this.router.events.subscribe((event: Event) => {
        const body = {
          'skip': this.page,
          'limit': 5
        };

        const uniteSub = this.uniteService.findAll(body).subscribe(unites => {
          this.unites = unites;
          this.progress.complete();
          uniteSub.unsubscribe();
        });
      });
  }

  ngOnInit() {

  }
}
