import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'dso-setting-help',
  templateUrl: './setting-help.component.html',
  styleUrls: ['./setting-help.component.scss']
})
export class SettingHelpComponent implements OnInit {

  categories = [
    {
      title: 'General content',
      url: ''
    },
    {
      title: 'Education',
      url: ''
    },
    {
      title: 'Career',
      url: ''
    },
    {
      title: 'Events',
      url: ''
    },
    {
      title: 'Unite',
      url: ''
    },
  ];

  noResult: boolean;
  term: string;
  searchType: string;
  searchResults: any[];

  constructor(private progress: NgProgress) {
    this.noResult = false;
    this.searchType = 'Categories';
    this.searchResults = [];
  }

  ngOnInit() {
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
