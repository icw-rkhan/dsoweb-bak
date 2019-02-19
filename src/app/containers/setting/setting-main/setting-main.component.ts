import { Component, OnInit } from '@angular/core';
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
    private router: Router) {}

  ngOnInit() {
  }

  onGoTo(url: string) {
    this.router.navigate([url]);
  }

}
