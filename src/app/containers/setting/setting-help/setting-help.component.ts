import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

import { SettingService } from '../../../services/setting.service';

@Component({
  selector: 'dso-setting-help',
  templateUrl: './setting-help.component.html',
  styleUrls: ['./setting-help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingHelpComponent implements OnInit {

  categories = [
    {
      title: 'General content',
      url: 'general'
    },
    {
      title: 'Education',
      url: 'education'
    },
    {
      title: 'Career',
      url: 'career'
    },
    {
      title: 'Events',
      url: 'events'
    },
    {
      title: 'Unite',
      url: 'unite'
    },
  ];

  noResult: boolean;
  term: string;
  searchType: string;
  searchResults: any[];

  constructor(
    private progress: NgProgress,
    private cdr: ChangeDetectorRef,
    private settingService: SettingService) {
    this.noResult = false;
    this.searchType = 'Categories';
    this.searchResults = [];
  }

  ngOnInit() {
    const body = {
      skip: 0,
      limit: 0
    };

    this.progress.start();
    this.settingService.getTopics(body).subscribe(topics => {
      this.progress.complete();

      this.searchResults = topics;

      this.cdr.markForCheck();
    },
    err => {
      this.progress.complete();
    });
  }

  onSearch() {
    this.term = 'job';
    this.searchType = this.term;

    this.searchResults = [
      {
        title: 'Search for jobs',
        url: ''
      },
      {
        title: 'Saving jobs',
        url: ''
      },
      {
        title: 'Creating and managing job Alerts',
        url: ''
      },
      {
        title: 'Filter a job search',
        url: ''
      },
      {
        title: 'View applied jobs',
        url: ''
      },
    ];
  }
}
