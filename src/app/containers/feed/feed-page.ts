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
      route: '/posts/latest',
    });
    this.navLinks.push({
      label: 'VIDEOS',
      route: '/posts/type/29',
    });
    this.navLinks.push({
      label: 'ARTICLES',
      route: '/posts/type/28',
    });
    this.navLinks.push({
      label: 'PODCASTS',
      route: '/posts/type/30',
    });
    this.navLinks.push({
      label: 'TECH GUIDES',
      route: '/posts/type/31',
    });
    this.navLinks.push({
      label: 'ANIMATIONS',
      route: '/posts/type/195',
    });
    this.navLinks.push({
      label: 'INTERVIEWS',
      route: '/posts/type/194',
    });
    this.navLinks.push({
      label: 'TIP SHEETS',
      route: '/posts/type/196',
    });
  }



}
