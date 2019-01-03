import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'dso-career-container',
  templateUrl: './career-container.component.html',
  styleUrls: ['./career-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerContainerComponent implements OnInit {

  showActionBar: boolean;
  showMoreActionBar: boolean;

  constructor(private router: Router) {
    this.showActionBar = true;
    this.showMoreActionBar = false;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;

        this.clear();

        if (url.includes('/career/detail') || url.includes('/career/review/add') ||
          url.includes('/career/alert/add')) {
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

    if (url === 'me') {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate([`/career/${url}`]);
    }
  }
}
