import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-career-main',
  templateUrl: './career-main.component.html',
  styleUrls: ['./career-main.component.scss']
})
export class CareerMainComponent implements OnInit {

  links: any[];

  constructor(private router: Router) {
    this.links = [
      {title: 'Search', url: '/career/search', icon: 'search'},
      {title: 'Me', url: '/career/oneself', icon: 'me'},
      {title: 'Review', url: '/career/review', icon: 'review'},
      {title: 'DSO Profiles', url: '/career/profile', icon: 'profiles'}
    ];
  }

  ngOnInit() {
  }

  onGoTo(url: string) {
    this.router.navigate([url]);
  }

}