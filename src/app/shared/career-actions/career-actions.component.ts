import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-career-actions',
  templateUrl: './career-actions.component.html',
  styleUrls: ['./career-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerActionsComponent implements OnInit {

  links: any[];

  constructor(private router: Router) {
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
        url: '/career/myjob',
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
        url: '/career',
        status: 'inactive'
      }
    ];
  }

  ngOnInit() {
  }

  onGoTo(link: any) {
    this.clear();

    link.status = 'active';

    this.router.navigate([link.url]);
  }

  clear() {
    this.links.map(link => {
      link.status = 'inactive';
    });
  }
}
