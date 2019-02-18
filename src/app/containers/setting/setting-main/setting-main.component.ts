import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-setting-main',
  templateUrl: './setting-main.component.html',
  styleUrls: ['./setting-main.component.scss']
})
export class SettingMainComponent implements OnInit {

  isPlaceholder: boolean;

  settings = [
    {
      title: 'Feedback and support',
      icon: 'feedback',
      url: 'settings/support'
    },
    {
      title: 'About',
      icon: 'about',
      url: 'settings/about'
    },
    {
      title: 'Change password',
      icon: 'lock',
      url: 'settings/password'
    }
  ];

  constructor(
    private router: Router,
    private location: Location,
    @Inject(DOCUMENT) private document: any) {
      this.isPlaceholder = false;
      const url = this.document.location.origin;

      if (url.includes('mobile.dsodentist.com')) {
        this.location.back();
      }

      /*
      if (url.includes('mobile.dsodentist.com')) {
        this.isPlaceholder = true;
      } else {
        this.isPlaceholder = false;
      }*/
  }

  ngOnInit() {
  }

  onGoTo(url: string) {
    this.router.navigate([url]);
  }

}
