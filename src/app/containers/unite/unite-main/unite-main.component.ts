import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { Router } from '@angular/router';

import { Unite } from '../../../models/unite.model';

import { UniteService } from '../../../services/unite.service';

@Component({
  selector: 'dso-unite-main',
  templateUrl: './unite-main.component.html',
  styleUrls: ['./unite-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniteMainComponent implements OnInit, OnDestroy {

  page: number;

  unites: Unite[];

  constructor(
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
        this.progress.complete();
        this.unites = unites;

        this.cdr.markForCheck();
        uniteSub.unsubscribe();
      });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.progress.complete();
  }
}
