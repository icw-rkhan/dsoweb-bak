import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';

import { Topic } from '../../../../models/topic.model';
import { SettingService } from '../../../../services/setting.service';

@Component({
  selector: 'dso-setting-help-list',
  templateUrl: './help-list.component.html',
  styleUrls: ['./help-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingHelpListComponent implements OnInit {

  moduleType: string;

  topics: Topic[];

  constructor(
    private router: Router,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private settingService: SettingService) {
    this.route.params.subscribe(params => {
      this.moduleType = params['moduleType'];
    });

    this.topics = [];
  }

  ngOnInit() {
    const body = {
      skip: 0,
      limit: 0,
      moduleType: this.moduleType ? this.moduleType : null
    };

    this.progress.start();
    this.settingService.getTopics(body).subscribe(topics => {
      this.progress.complete();

      this.topics = topics;

      this.cdr.markForCheck();
    },
    err => {
      this.progress.complete();
    });
  }

  onGoTo(url: string) {
    if (url) {
      let u = url.toLocaleLowerCase();

      if (u === 'general') {
        u = 'posts/type';
      }

      this.router.navigate([`/${u}`]);
    }
  }

  onGoToContact() {
    this.router.navigate(['/settings/support/contact']);
  }
}
