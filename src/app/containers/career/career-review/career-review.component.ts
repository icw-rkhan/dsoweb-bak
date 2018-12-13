import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'dso-career-review',
  templateUrl: './career-review.component.html',
  styleUrls: ['./career-review.component.scss']
})
export class CareerReviewComponent implements OnInit {

  showActionBar: boolean;
  showMoreActionBar: boolean;

  constructor(private router: Router) {
    this.showActionBar = true;
    this.showMoreActionBar = false;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;

        if (url.includes('/career/review/add')) {
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
