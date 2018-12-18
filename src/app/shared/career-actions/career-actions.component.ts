import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'dso-career-actions',
  templateUrl: './career-actions.component.html',
  styleUrls: ['./career-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerActionsComponent implements OnInit {

  flag: boolean;
  links: any[];

  @Output() moreEvent = new EventEmitter<number>();

  constructor(private router: Router) {
    this.flag = false;
  }

  ngOnInit() {

    this.links = [
      {
        title: 'Explore',
        icon: 'explore',
        url: '/career',
        status: 'active'
      },
      {
        title: 'Find Job',
        icon: 'find',
        url: '/career/search',
        status: 'inactive'
      },
      {
        title: 'My Jobs',
        icon: 'my-jobs',
        url: '/career/my-job',
        status: 'inactive'
      },
      {
        title: 'Alerts',
        icon: 'alert',
        url: '/career/alert',
        status: 'inactive'
      },
      {
        title: 'More',
        icon: 'more',
        url: '#more',
        status: 'inactive'
      }
    ];

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;

        if (url !== '/career' && url !== '/career/search' &&
            url !== '/career/my-job' && url !== '/career/alert') {
          this.clear();
        }
      }
    });
  }

  onGoTo(i: number) {
    this.clear();
    this.links[i].status = 'active';

    if (this.links[i].url !== '#more') {
      this.flag = false;

      this.moreEvent.emit(0);

      this.router.navigate([this.links[i].url]);
    } else {
      this.flag = !this.flag;
      if (this.flag) {
        this.links[i].status = 'active';
      } else {
        this.links[i].status = 'inactive';
      }

      this.moreEvent.emit(1);
    }
  }

  clear() {
    this.links.map(link => {
      link.status = 'inactive';
    });
  }
}
