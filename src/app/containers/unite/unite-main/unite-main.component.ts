import { Component, OnInit, ViewChild, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { Unite } from '../../../models/unite.model';
import { UniteService } from '../../../services/unite.service';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'dso-unite-main',
  templateUrl: './unite-main.component.html',
  styleUrls: ['./unite-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniteMainComponent implements OnInit {

  page: number;
  unites: Unite[];

  constructor(
    private router: Router,
    private progress: NgProgress,
    private cdr: ChangeDetectorRef,
    private uniteService: UniteService) {
      this.page = 0;

      this.progress.start();
        const body = {
          'skip': this.page,
          'limit': 0
        };

      const uniteSub = this.uniteService.findAll(body).subscribe(unites => {
        this.unites = unites;

        this.cdr.markForCheck();

        this.progress.complete();
        uniteSub.unsubscribe();
      });
  }

  ngOnInit() {

  }
}
