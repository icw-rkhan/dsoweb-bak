import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'dso-career-main',
  templateUrl: './career-main.component.html',
  styleUrls: ['./career-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerMainComponent implements OnInit {

  links: any[];
  isPlaceholder: boolean;

  constructor(private router: Router) {
    this.links = [
      {title: 'Search', url: '/career/search', icon: 'search'},
      {title: 'Me', url: '/profile', icon: 'me'},
      {title: 'Review', url: '/career/review', icon: 'review'},
      {title: 'DSO Profiles', url: '/career/dso-profile', icon: 'profiles'}
    ];

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;

        if (url.includes('devangular1.dsodentist.com')) {
          this.isPlaceholder = true;
        } else {
          this.isPlaceholder = false;
        }
      }
    });
  }

  ngOnInit() {
  }

  onGoTo(url: string) {
    this.router.navigate([url]);
  }

}
