import { Component, OnInit } from '@angular/core';
import { NavLinkModel } from '../../models/nav-link.model';

@Component({
  templateUrl: './feed-page.html',
  styleUrls: ['./feed-page.scss'],
})
export class FeedPageComponent implements OnInit {

  navLinks: NavLinkModel[] = [];

  ngOnInit(): void {
    this.navLinks.push({
      label: 'LATEST',
      route: '/feed/latest',
    });
    this.navLinks.push({
      label: 'VIDEOS',
      route: '/feed/post-type/29',
    });
    this.navLinks.push({
      label: 'ARTICLES',
      route: '/feed/post-type/28',
    });
    this.navLinks.push({
      label: 'PODCASTS',
      route: '/feed/post-type/30',
    });
    this.navLinks.push({
      label: 'TECH GUIDES',
      route: '/feed/post-type/31',
    });
  }

}
