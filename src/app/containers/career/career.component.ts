import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'dso-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  showActionBar: boolean;
  showMoreActionBar: boolean;

  constructor(private router: Router) {
    this.showActionBar = true;
    this.showMoreActionBar = false;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;

        if (url.includes('/career/detail')) {
          this.showActionBar = false;
        } else {
          this.showActionBar = true;
        }
      }
    });
  }

  ngOnInit() {
  }

  clear() {
    this.showMoreActionBar = false;
  }

  onShowMoreActionBar(flag: number) {
    if (flag === 1) {
      this.showMoreActionBar = !this.showMoreActionBar;
    } else {
      this.clear();
    }
  }

  onGoTo(url: string) {
    this.showMoreActionBar = false;
    this.router.navigate([`/career/${url}`]);
  }
}
