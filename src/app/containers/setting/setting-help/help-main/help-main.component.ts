import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { SettingService } from '../../../../services/setting.service';
import { Topic } from '../../../../models/topic.model';

@Component({
  selector: 'dso-setting-help-main',
  templateUrl: './help-main.component.html',
  styleUrls: ['./help-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingHelpMainComponent implements OnInit {

  categories = [
    {
      id: '-1',
      function: 'General Content',
      moduleType: 'general'
    },
    {
      id: '-1',
      function: 'General Settings',
      moduleType: 'settings'
    },
    {
      id: '-1',
      function: 'Education',
      moduleType: 'education'
    },
    {
      id: '-1',
      function: 'Career',
      moduleType: 'career'
    },
    {
      id: '-1',
      function: 'Events',
      moduleType: 'events'
    },
    {
      id: '-1',
      function: 'Unite',
      moduleType: 'unite'
    },
  ];

  term: string;
  moduleType: string;
  noResult: boolean;
  isSearching: boolean;

  searchResults: Topic[];
  allTopics: Topic[];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private settingService: SettingService) {
    this.noResult = false;
    this.isSearching = false;
    this.moduleType = 'Categories';
    this.searchResults = [];
    this.allTopics = [];
  }

  ngOnInit() {
    const body = {
      skip: 0,
      limit: 0
    };

    this.settingService.getTopics(body).subscribe(topics => {
      this.allTopics = topics;

      this.makeTestData();
    });
  }

  makeTestData() {
    const topic = new Topic();
    topic.id = '1';
    topic.moduleType = 'Settings';
    topic.function = 'How do I change playback speed?';
    topic.description = 'You can change the playback speed of the videos in the app. To do this:';
    topic.subDescription = [
      {
        name: 'Tap on General from the Settings screen',
        steps: '1'
      },
      {
        name: 'Tap on Playback Speed and then tap on the desired value. The app will save screen',
        steps: '2'
      }
    ];
    this.allTopics.push(topic);
  }

  onSearch(e) {
    const term = e.target.value.toLocaleLowerCase();
    this.isSearching = true;

    this.searchResults = this.allTopics.filter(topic => topic.function.toLocaleLowerCase().includes(term));

    if (this.searchResults.length > 0) {
      this.moduleType = this.searchResults[0].moduleType;
    } else {
      this.noResult = true;
    }

    this.cdr.markForCheck();
  }

  onGoTo(topic: Topic) {
    if (topic.id !== '-1') {
      this.router.navigate([`/setting/support/help/list/${topic.moduleType}/${topic.id}`]);
    } else {
      this.router.navigate([`/setting/support/help/list/${topic.moduleType}`]);
    }
  }

  onDefault() {
    if (this.isSearching) {
      this.isSearching = false;

      this.moduleType = 'Categories';
      this.searchResults = [];
      this.term = '';
      this.noResult = false;
    }
  }
}
