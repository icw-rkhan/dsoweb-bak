import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

import { SettingService } from '../../../services/setting.service';

import { Term } from '../../../models/term.model';

@Component({
  selector: 'dso-setting-about',
  templateUrl: './setting-about.component.html',
  styleUrls: ['./setting-about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingAboutComponent implements OnInit {

  condition: Term;
  policy: Term;

  constructor(
    private progress: NgProgress,
    private cdr: ChangeDetectorRef,
    private settingService: SettingService) { }

  ngOnInit() {
    /*const body = {
      skip: 0,
      limit: 0
    };

    this.progress.start();
    this.settingService.getTerms(body).subscribe(terms => {
      this.progress.complete();

      terms.map(term => {
        if (term.type === '1') {
          this.policy = term;
        } else {
          this.condition = term;
        }
      });

      this.cdr.markForCheck();
    },
    err => {
      this.progress.complete();
    });*/
  }

}
