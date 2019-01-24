import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-setting-main',
  templateUrl: './setting-main.component.html',
  styleUrls: ['./setting-main.component.scss']
})
export class SettingMainComponent implements OnInit {

  settings = [
    {
      title: 'Feedback and support',
      icon: 'feedback',
      url: 'setting/support'
    },
    {
      title: 'About',
      icon: 'about',
      url: 'setting/about'
    },
    {
      title: 'Change password',
      icon: 'lock',
      url: 'setting/password'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onGoTo(url: string) {
    this.router.navigate([url]);
  }

}
