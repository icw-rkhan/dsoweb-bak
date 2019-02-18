import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,
      OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import { Subscription } from 'rxjs';

import { Topic } from '../../../../models/topic.model';

import { SharingService } from 'src/app/services/sharing.service';
import { SettingService } from '../../../../services/setting.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-setting-help-list',
  templateUrl: './help-list.component.html',
  styleUrls: ['./help-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingHelpListComponent implements OnInit, OnDestroy, AfterViewInit {

  moduleType: string;

  topics: Topic[];

  subRoute: Subscription;

  @ViewChild('footerContainer') footerContainer: ElementRef;

  constructor(
    private router: Router,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private sharingService: SharingService,
    private settingService: SettingService) {
      this.subRoute = this.route.params.subscribe(params => {
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
    const subSetting = this.settingService.getTopics(body).subscribe(topics => {
      this.progress.complete();

      this.topics = topics;

      this.cdr.markForCheck();
      subSetting.unsubscribe();
    },
    err => {
      this.progress.complete();
    });
  }

  ngAfterViewInit() {
    const device = this.sharingService.getMyDevice();
    if (device === 'desktop') {
      const element = this.footerContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
      element.style.margin = 'auto';
    }
  }

  ngOnDestroy() {
    this.progress.complete();

    this.subRoute.unsubscribe();
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
