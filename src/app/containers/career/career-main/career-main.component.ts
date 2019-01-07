import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'dso-career-main',
  templateUrl: './career-main.component.html',
  styleUrls: ['./career-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerMainComponent implements OnInit {

  links: any[];
  isPlaceholder: boolean;

  constructor(private router: Router, @Inject(DOCUMENT) private document: any) {
    this.links = [
      {title: 'Search', url: '/career/search', icon: 'search'},
      {title: 'Me', url: '/profile', icon: 'me'},
      {title: 'Review', url: '/career/review', icon: 'review'},
      {title: 'DSO Profiles', url: '/career/dso-profile', icon: 'profiles'}
    ];

    const url = this.document.location.origin;

    if (url.includes('devangular1.dsodentist.com')) {
      this.isPlaceholder = true;
    } else {
      this.isPlaceholder = false;
    }

    console.log(url);
  }

  ngOnInit() {
  }

  onGoTo(url: string) {
    this.router.navigate([url]);
  }

}
