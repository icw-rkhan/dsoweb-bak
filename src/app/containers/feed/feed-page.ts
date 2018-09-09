import { Component, OnInit } from '@angular/core';

import { NavLinkModel } from '../../models/nav-link.model';

@Component({
  templateUrl: './feed-page.html',
  styleUrls: ['./feed-page.scss'],
})
export class FeedPageComponent implements OnInit {

  navLinks: NavLinkModel[] = [];
  navFooterLinks: NavLinkModel[] = [];

  ngOnInit(): void {
    this.navLinks.push({
      label: 'LATEST',
      route: '/feed/latest',
    });
    this.navLinks.push({
      label: 'VIDEOS',
      route: '/feed/videos',
    });
    this.navLinks.push({
      label: 'ARTICLES',
      route: '/feed/articles',
    });
    this.navLinks.push({
      label: 'PODCASTS',
      route: '/feed/podcasts',
    });
    this.navLinks.push({
      label: 'INTERVIEWS',
      route: '/feed/interviews',
    });
    this.navLinks.push({
      label: 'TECH GUIDES',
      route: '/feed/tech-guides',
    });
    this.navLinks.push({
      label: 'ANIMATIONS',
      route: '/feed/animations',
    });
    this.navLinks.push({
      label: 'TIP SHEETS',
      route: '/feed/tip-sheets',
    });
    // Footer links
    this.navFooterLinks.push({
      label: 'For You',
      route: '/feed/tip-sheets',
      icon: 'receipt'
    });
    this.navFooterLinks.push({
      label: 'Search',
      route: '/feed/tip-sheets',
      icon: 'search'
    });
    this.navFooterLinks.push({
      label: 'Category',
      route: '/feed/tip-sheets',
      icon: 'view_list'
    });
    this.navFooterLinks.push({
      label: 'Bookmarks',
      route: '/feed/tip-sheets',
      icon: 'bookmarks'
    });
    this.navFooterLinks.push({
      label: 'Download',
      route: '/feed/tip-sheets',
      icon: 'cloud_download'
    });
  }

}
