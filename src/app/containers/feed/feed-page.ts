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
  }

}
