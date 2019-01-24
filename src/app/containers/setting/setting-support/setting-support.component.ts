import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-setting-support',
  templateUrl: './setting-support.component.html',
  styleUrls: ['./setting-support.component.scss']
})
export class SettingSupportComponent implements OnInit {

  links = [
    {
      title: 'Help and Feedback',
      url: 'setting/support/help'
    },
    {
      title: 'Contact DSODentist',
      url: 'setting/support/contact'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onGoTo(url: string) {
    this.router.navigate([url]);
  }
}
